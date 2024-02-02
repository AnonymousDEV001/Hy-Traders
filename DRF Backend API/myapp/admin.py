from django.contrib import admin
from .models import *

# Register your models here.


admin.site.register(CustomUser)
admin.site.register(social_auth)
admin.site.register(product_cart_model)
admin.site.register(catagory_model)
admin.site.register(products_model)
admin.site.register(product_feature_model)
admin.site.register(product_features_model)
admin.site.register(product_color_model)
admin.site.register(product_image_model)
admin.site.register(product_keyword_model)
admin.site.register(product_stock_model)
admin.site.register(product_storage_model)