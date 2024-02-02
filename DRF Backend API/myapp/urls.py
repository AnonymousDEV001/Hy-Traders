from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('', views.index),
    path('api/user/', views.user),
    path('api/create/user/', views.create_user),
    path('verify/<str:uidb64>/<str:token>/', views.verify_email, name='verify_email'),
    path('api/token_verification_view/', views.token_verification_view, name='verify_email'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/catagory/', views.catagory_view),
    path('api/product/', views.product_view),
    path('api/products/', views.products_view),
    path('api/feature/<int:product_id>/', views.features_view),
    path('api/feature/', views.create_feature_view),
    path('api/imageUpload/<int:product_id>/', views.ImageUpload_view),
    path('api/imageUpload/', views.create_ImageUpload_view),
    path('api/suggestions/', views.product_suggestions_view),
    path('api/search/', views.product_search_view),
    path('api/storage/', views.storage_view),
    path('api/stock/', views.stock_view),
    path('api/cart/', views.cart_view),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)