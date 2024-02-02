from rest_framework import serializers
from ..models import *


class catagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = catagory_model
        fields = ["id", "catagory", "image"]


class products_model_serializer(serializers.ModelSerializer):

    class Meta:
        model = products_model
        fields = [
            "id",
            "catagoryForignKey",
            "title",
            "thumbnail",
            "offPrice",
            "ready",
            "price",
            "sales",
            "created",
            'lastupdated'
        ]

    def create(self, validated_data):
        return products_model.objects.create(**validated_data)


class product_feature_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_feature_model
        fields = ['id', 'productForignKey', 'featureHeading']


class product_features_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_features_model
        fields = ['id', 'productFeatureForignKey', 'key', 'value']


class product_color_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_color_model
        fields = ['id', 'productForignKey', 'color']


class product_image_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_image_model
        fields = ['id', 'productColorForignKey', 'image']


class product_description_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_description_model
        fields = ['id', 'productForignKey', 'description']


class product_storage_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_storage_model
        fields = ['id', 'productForignKey', 'ram', 'rom', 'incrementPrice']


class product_stock_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_stock_model
        fields = ['id','productForignKey', 'productColorForignKey',
                  'productStorageForignKey', 'stock']



class product_keyword_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_keyword_model
        fields = ['id', 'productForignKey', 'keyword']


class product_cart_serializer(serializers.ModelSerializer):
    class Meta:
        model = product_cart_model
        fields = ['id','userForignKey','productForignKey','productStockForignKey','checked','quantity']