from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers.productsSerializer import *
import os

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import *


from rest_framework import status
import requests
from rest_framework.permissions import IsAuthenticated
from .serializers.userSerializer import *
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.conf import settings
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user(request):
    user_profile = CustomUser.objects.get(email=request.user)
    user_data = CustomUserSerializer(user_profile)
    return Response(user_data.data)


def send_verification_email(user):
    # Generate email verification token
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    # Build verification URL
    verification_url = reverse('verify_email', kwargs={
                               'uidb64': uid, 'token': token})
    verification_link = f"{settings.FRONTEND_BASE_URL}{verification_url}"

    # Send verification email
    send_mail(
        'Verify your email',
        f'Click the link to verify your email: {verification_link}',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )

# For creating new users using normal signup


@api_view(["POST"])
def create_user(request):
    if request.method == 'POST':
        data = request.data
        user_serializer = CustomUserSerializer(data=data)
        if user_serializer.is_valid():
            existing_user = CustomUser.objects.filter(
                email=data["email"]).first()
            if existing_user:
                if existing_user.is_verified:
                    return Response({"error": "User already exists and is verified."})

                existing_user_serializer = CustomUserSerializer(
                    existing_user, data=data, partial=True)
                if existing_user_serializer.is_valid():
                    existing_user_serializer.save()
                    # Send verification email again
                    send_verification_email(existing_user)
                    return Response({"message": "User details updated. Please check your email for verification."})
                return Response(existing_user_serializer.errors)

            user = user_serializer.save()
            # Send verification email for new user
            send_verification_email(user)

            return Response({"message": "User created. Please check your email for verification."})
        return Response(user_serializer.errors)


# Email verification part of email signup
@api_view(["GET"])
def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_verified = True  # Assuming the field name in the model is 'is_verified'
        user.save()
        return Response({"message": "Email verified successfully"})
    return Response({"message": "Invalid verification link"})


# Token verification for OAUTH works for only google and facebook

@api_view(['POST'])
def token_verification_view(request):
    provider = request.data.get('provider')
    token = request.data.get('token')

    if not provider or not token:
        return Response({'error': 'Provider and token are required'}, status=status.HTTP_400_BAD_REQUEST)

    if provider == 'google':
        user_info_url = f"https://www.googleapis.com/oauth2/v3/userinfo"
        headers = {
            'Authorization': f'Bearer {token}'
        }
        user_info_response = requests.get(user_info_url, headers=headers)

        if user_info_response.status_code == 200:
            user_info_data = user_info_response.json()
            email = user_info_data.get("email")
            first_name = user_info_data.get("given_name")
            last_name = user_info_data.get("family_name")
            is_verified = user_info_data.get("email_verified")

            # Check if the user already exists in the database
            existing_user = CustomUser.objects.filter(email=email).first()
            existing_user_oauth = social_auth.objects.filter(
                email=email).first()
            # checking if user already exists and is signed up using other methord or not
            if existing_user:
                if existing_user.provider != "google":
                    return Response({'error': 'User Has been registered using some other methord'}, status=status.HTTP_400_BAD_REQUEST)
                # Update the existing user's information
                existing_user.first_name = first_name
                existing_user.last_name = last_name
                existing_user.is_verified = is_verified
                existing_user.save()
                if existing_user_oauth:
                    existing_user_oauth.access_token = token
                    existing_user_oauth.save()
                else:
                    # Create a new social_auth entry if it doesn't exist
                    social_auth.objects.create(
                        foreignKey=existing_user,
                        email=email,
                        access_token=token,
                        provider=provider
                    )
            else:
                # Create a new user
                new_user = CustomUser.objects.create(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    provider=provider,
                    is_verified=is_verified
                )
                new_user_oauth = social_auth.objects.create(
                    foreignKey=new_user,
                    email=email,
                    access_token=token,
                    provider=provider
                )

            refresh = RefreshToken.for_user(
                existing_user if existing_user else new_user)

            # Access token can be obtained from the refresh token
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({"refresh": refresh_token, 'access': access_token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Google access token'}, status=status.HTTP_401_UNAUTHORIZED)

    elif provider == 'facebook':
        # Verify Facebook token
        facebook_url = f"https://graph.facebook.com/debug_token?input_token={token}&access_token={settings.FACEBOOK_APP_ID}|{settings.FACEBOOK_APP_SECRET}"
        response = requests.get(facebook_url)
        data = response.json()

        if 'data' in data and data['data']['is_valid']:
            user_token = data['data']['user_id']
            user_info_url = f"https://graph.facebook.com/{user_token}?fields=email,first_name,last_name&access_token={token}"
            user_info_response = requests.get(user_info_url)
            user_info_data = user_info_response.json()
            if 'email' in user_info_data:
                email = user_info_data.get("email")
                first_name = user_info_data.get("first_name")
                last_name = user_info_data.get("last_name")
                is_verified = True
                existing_user = CustomUser.objects.filter(email=email).first()
                existing_user_oauth = social_auth.objects.filter(
                    email=email).first()

                if existing_user:
                    if existing_user.provider != "facebook":
                        return Response({'error': 'User Has been registered using some other methord'}, status=status.HTTP_400_BAD_REQUEST)
                    # Update the existing user's information
                    existing_user.first_name = first_name
                    existing_user.last_name = last_name
                    existing_user.is_verified = is_verified
                    existing_user.save()
                    if existing_user_oauth:
                        existing_user_oauth.access_token = token
                        existing_user_oauth.save()
                    else:
                        # Create a new social_auth entry if it doesn't exist
                        social_auth.objects.create(
                            foreignKey=existing_user,
                            email=email,
                            access_token=token,
                            provider=provider
                        )

                else:
                    # Create a new user
                    new_user = CustomUser.objects.create(
                        email=email,
                        first_name=first_name,
                        last_name=last_name,
                        provider=provider,
                        is_verified=is_verified
                    )
                    new_user_oauth = social_auth.objects.create(
                        foreignKey=new_user,
                        email=email,
                        access_token=token,
                        provider=provider
                    )

                refresh = RefreshToken.for_user(
                    existing_user if existing_user else new_user)

                # Access token can be obtained from the refresh token
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                return Response({"refresh": refresh_token, 'access': access_token}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Unable to fetch user data from Facebook'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid Facebook token'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'Invalid provider'}, status=status.HTTP_400_BAD_REQUEST)


# ===========================AUTHENTICATION ENDED=============================================


@api_view(["GET"])
def index(request):
    return Response({"message": "hello"})


@api_view(["GET", "POST", "DELETE", "PUT"])
def catagory_view(request):
    if request.method == "DELETE":

        catagory_id = request.data.get('id')
        catagory_instance = get_object_or_404(catagory_model, pk=catagory_id)

        image_path = catagory_instance.image.path

        if os.path.exists(image_path):
            os.remove(image_path)

        related_products = products_model.objects.filter(
            catagoryForignKey=catagory_instance)
        for product in related_products:
            thumbnail_path = product.thumbnail.path
            if os.path.exists(thumbnail_path):
                os.remove(thumbnail_path)

        catagory_instance.delete()

        return Response({"message": "Category and associated image deleted successfully"})

    if request.method == "GET":
        catagories = catagory_model.objects.all()
        serializer = catagorySerializer(catagories, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        catagory_name = request.data.get('catagory')
        existing_category = catagory_model.objects.filter(
            catagory=catagory_name)

        if existing_category.exists():
            return Response({"error": "Category already exists"}, status=400)
        else:
            serializer = catagorySerializer(data=request.data)

            if serializer.is_valid():
                image_file = request.data.get('image')

                img = Image.open(image_file)

                output = BytesIO()

                img.save(output, format='WEBP', quality=70)

                compressed_image = InMemoryUploadedFile(
                    output, None, 'compressed_image.webp', 'image/webp', output.tell(), None)

                serializer.validated_data['image'] = compressed_image
                serializer.save()
                return Response({"message": "Data received and saved successfully"})
            else:
                return Response({"error": serializer.errors}, status=400)

    if request.method == "PUT":
        updated_data = request.data
        existing_catagory_instance = catagory_model.objects.get(
            id=updated_data.get("id"))
        if existing_catagory_instance:
            if updated_data.get("image"):

                image_path = existing_catagory_instance.image.path
                if os.path.exists(image_path):
                    os.remove(image_path)

            catagory_instance = catagorySerializer(
                existing_catagory_instance, data=updated_data, partial=True)

            if catagory_instance.is_valid():
                if updated_data.get("image"):
                    image_file = request.data.get('image')
                    img = Image.open(image_file)
                    output = BytesIO()

                    img.save(output, format='WEBP', quality=70)
                    compressed_image = InMemoryUploadedFile(
                        output, None, 'compressed_image.webp', 'image/webp', output.tell(), None)
                    catagory_instance.validated_data['image'] = compressed_image
                catagory_instance.save()
                return Response({"message": "Category updated successfully"})
            return Response(catagory_instance.errors)

        return Response({"error": "Catagory Does Not Exist"})


# ============================PRODUCT SECTION=============================


@api_view(["GET", "POST", "DELETE", "PUT"])
def product_view(request):
    if request.method == "GET":
        product_id = int(request.query_params.get('product_id', ''))

        product = products_model.objects.filter(id=product_id).first()
        if product:
            productSerializer = products_model_serializer(product)
            return Response(productSerializer.data, status=200)
        return Response({"error:product not found"}, status=400)

    if request.method == "POST":

        productSerializer = products_model_serializer(data=request.data)
        if productSerializer.is_valid():
            productSerializer.save()
            return Response(productSerializer.data)
        return Response(productSerializer.errors)


@api_view(["GET", "POST", "DELETE", "PUT"])
def products_view(request):
    if request.method == "GET":
        page = int(request.query_params.get('page', 1))

        start_index = (page - 1) * 12
        end_index = page * 12
        product = products_model.objects.all()[start_index:end_index]

        productSerializer = products_model_serializer(product, many=True)
        return Response(productSerializer.data)


@api_view(["GET", "POST", "DELETE", "PUT"])
def features_view(request, product_id):
    if request.method == "GET":
        product_feature_headings = product_feature_model.objects.filter(
            productForignKey=product_id)
        product_feature_headings_serializer = product_feature_serializer(
            product_feature_headings, many=True)

        # Serialize each ProductFeatureModel instance
        serialized_data = []
        for heading_serializer in product_feature_headings_serializer.data:
            product_feature_id = heading_serializer['id']
            product_features = product_features_model.objects.filter(
                productFeatureForignKey=product_feature_id)
            product_features_serialize = product_features_serializer(
                product_features, many=True)

            # Add product_features data to each product_feature_heading entry
            heading_serializer['product_features'] = product_features_serialize.data
            serialized_data.append(heading_serializer)

        return Response(serialized_data)


@api_view(["GET", "POST", "DELETE", "PUT"])
def create_feature_view(request):
    if request.method == "POST":
        for key in request.data.get("features"):
            data = {
                "productForignKey": request.data.get("id"),
                "featureHeading": key["featureHeading"]
            }
            product_feature_heading_instance = product_feature_serializer(
                data=data)
            if product_feature_heading_instance.is_valid():
                # print(product_feature_heading_instance)
                instance = product_feature_heading_instance.save()

                for key in key["features"]:
                    data = {
                        "productFeatureForignKey": instance.id,
                        "key": key["key"],
                        "value": key["value"]

                    }
                    product_features_instance = product_features_serializer(
                        data=data)
                    if product_features_instance.is_valid():
                        product_features_instance.save()
                    else:
                        return Response(product_features_instance.errors, status=400)

            else:
                return Response(product_feature_heading_instance.errors, status=400)
        return Response({"message": "successful"}, status=200)


@api_view(["GET", "POST"])
def storage_view(request):
    if request.method == "GET":
        product_id = request.query_params.get('product_id', '')
        storage = product_storage_model.objects.filter(
            productForignKey=product_id)
        storage_serializer = product_storage_serializer(storage, many=True)
        return Response(storage_serializer.data)

    if request.method == "POST":

        for item in request.data.get("storage"):
            item["productForignKey"] = request.data.get("id")
            product_storage = product_storage_serializer(data=item)
            if product_storage.is_valid():
                product_storage.save()
            else:
                return Response(product_storage.errors, status=400)

        return Response({"message": "successful"}, status=201)


@api_view(["GET", "POST"])
def ImageUpload_view(request, product_id):
    if request.method == "GET":
        product_color = product_color_model.objects.filter(
            productForignKey=product_id)
        product_color_instance = product_color_serializer(
            product_color, many=True)

        serialized_data = []
        for color in product_color_instance.data:
            color_id = color["id"]
            product_image = product_image_model.objects.filter(
                productColorForignKey=color_id)
            product_image_instance = product_image_serializer(
                product_image, many=True)

            color["images"] = product_image_instance.data
            serialized_data.append(color)

        return Response(serialized_data)


@api_view(["GET", "POST"])
def create_ImageUpload_view(request):
    if request.method == 'POST':
        color = request.data.get('color')
        productForignKey = request.data.get('productForignKey')

        colorObj = {
            "color": color,
            "productForignKey": productForignKey
        }

        product_color_instance = product_color_serializer(data=colorObj)
        if product_color_instance.is_valid():
            productColorForignKey = product_color_instance.save()
            productColorForignKey = productColorForignKey.id

            files_uploaded = False  # Flag to track if files are uploaded

            for i in range(len(request.FILES)):
                file_key = f"images_{i}"
                if file_key in request.FILES:
                    files_uploaded = True  # Mark as files are uploaded
                    image_file = request.FILES[file_key]

                    imageObj = {
                        "productColorForignKey": productColorForignKey,
                        "image": image_file
                    }
                    product_image_instance = product_image_serializer(
                        data=imageObj)
                    if product_image_instance.is_valid():
                        product_image_instance.save()
                    else:
                        return Response(product_image_instance.errors, status=400)

            if not files_uploaded:
                return Response({"message": "No images were provided"}, status=400)

            return Response({"message": "successful"}, status=201)

        return Response(product_color_instance.errors, status=400)

    return Response({"error": "some error occurred"}, status=400)


@api_view(['GET'])
def product_suggestions_view(request):
    # Get the query from request parameters
    query = request.query_params.get('keyword', '')

    # Fetch unique products based on the query from keywords
    matched_products = product_keyword_model.objects.filter(
        keyword__icontains=query).distinct()[:10]

    serializer = product_keyword_serializer(matched_products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_search_view(request):
    keyword = request.query_params.get('keyword', '')
    page = int(request.query_params.get('page', 1))
    page_size = int(request.query_params.get('page_size', 10))

    # Calculate start and end indexes for pagination
    start_index = (page - 1) * page_size
    end_index = page * page_size

    # Fetch products related to the keyword
    if keyword:
        # Get all product keywords matching the provided keyword
        matched_keywords = product_keyword_model.objects.filter(
            keyword__icontains=keyword).values_list('productForignKey', flat=True).distinct()
        matched_keywords_list = list(matched_keywords)

        # matched_products = product_keywords_model.objects.filter(
        #     id__in=matched_keywords_list).values_list('productForignKey', flat=True).distinct()
        # matched_products_list = list(matched_products)

        related_products = products_model.objects.filter(
            id__in=matched_keywords_list, ready=True).order_by('-sales')[start_index:end_index]

        serializer = products_model_serializer(related_products, many=True)
        return Response(serializer.data)
    else:
        return Response([])


@api_view(['GET', "POST"])
def stock_view(request):
    if request.method == "GET":
        product_id = request.query_params.get('product_id', '')
        stock = product_stock_model.objects.filter(productForignKey=product_id)
        stockSerializer = product_stock_serializer(stock, many=True)
        return Response(stockSerializer.data)

    if request.method == "POST":
        stock = product_stock_serializer(data=request.data)
        if stock.is_valid():
            stock.save()
            return Response(stock.data, status=201)
        return Response(stock.errors, status=400)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def cart_view(request):
    if request.method == "POST":
        user = request.user
        productId = request.data["productForignKey"]
        stockId = request.data["productStockForignKey"]
        quantity_ = request.data["quantity"]


        existing_stock = product_cart_model.objects.filter(userForignKey=user , productStockForignKey = stockId).first()
        if existing_stock:
            return Response({"error": "product already exists in cart"}, status=401)

        user_profile = CustomUser.objects.get(email=user)
        user_data = CustomUserSerializer(user_profile)

        values = {
            "userForignKey":user_data.data["id"],
            "productForignKey":productId,
            "productStockForignKey":stockId,
            "quantity":quantity_
        }        
        product_cart = product_cart_serializer(data=values)
        if product_cart.is_valid():
            product_cart.save()
            return Response({"message": "success"}, status=201)
        return Response(product_cart.errors, status=401)

    if request.method == 'GET':
        user = request.user  # Access authenticated user

        product_cart = product_cart_model.objects.filter(userForignKey=user)
        product_cart_instance = product_cart_serializer(
            product_cart, many=True)

        serializedData = []
        if product_cart_instance:
            for key in product_cart_instance.data:
                products_models = products_model.objects.filter(
                    id=key["productForignKey"]).first()
                products_models_instance = products_model_serializer(
                    products_models)

                products_stock = product_stock_model.objects.filter(
                    id=key["productStockForignKey"]).first()
                products_stock_instance = product_stock_serializer(
                    products_stock)

                products_color = product_color_model.objects.filter(
                    id=products_stock_instance.data["productColorForignKey"]).first()
                products_color_instance = product_color_serializer(
                    products_color)

                products_image = product_image_model.objects.filter(
                    productColorForignKey=products_stock_instance.data["productColorForignKey"]).first()
                products_image_instance = product_image_serializer(
                    products_image)

                product_storage = product_storage_model.objects.filter(
                    id=products_stock_instance.data["productStorageForignKey"]).first()
                products_storage_instance = product_storage_serializer(
                    product_storage)

                product_Data = {
                    "product": products_models_instance.data,
                    "stock": products_stock_instance.data,
                    "color": products_color_instance.data,
                    "image": products_image_instance.data,
                    "storage": products_storage_instance.data,
                    "cart": key
                }
                serializedData.append(product_Data)

        return Response(serializedData, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        id = request.data.get("id")
        user = request.user
        product_cart = product_cart_model.objects.filter(
            userForignKey=user, id=id)
        if product_cart:
            product_cart.delete()
            return Response({"message": "success"}, status=200)
        return Response({"error": "not found"}, status=400)

    if request.method == 'PUT':
        id = request.data.get("id")
        data = request.data

        user = request.user
        existing_cart_item = product_cart_model.objects.filter(
            userForignKey=user, id=id).first()
        if existing_cart_item:
            existing_cart_item_instance = product_cart_serializer(
                existing_cart_item, data=data, partial=True)
            if existing_cart_item_instance.is_valid():
                existing_cart_item_instance.save()
                return Response({"message": "success"}, status=200)
            return Response({"error": existing_cart_item_instance.errors}, status=400)
        return Response({"error": "not found"}, status=400)
