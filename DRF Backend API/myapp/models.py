from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, password, **other_fields)

    def create_user(self, email, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address', unique=True)
    # username = models.CharField(max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    provider = models.CharField(default="email")
    is_verified = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email


class social_auth(models.Model):
    foreignKey = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='oauth_access_tokens')
    email = models.EmailField(unique=True)
    access_token = models.TextField()
    provider = models.CharField(max_length=100)

    def __str__(self):
        return self.email

















class catagory_model(models.Model):
    catagory = models.CharField()
    image = models.ImageField(upload_to='categories/%y')


class products_model(models.Model):
    catagoryForignKey = models.ForeignKey(
        catagory_model, on_delete=models.CASCADE)
    title = models.CharField()
    thumbnail = models.ImageField(upload_to='thumbnails/%y')
    offPrice = models.CharField()
    price = models.CharField()
    sales = models.IntegerField(default=0)
    ready = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)
    lastupdated = models.DateTimeField(auto_now=True)


class product_feature_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, related_name='features', on_delete=models.CASCADE)
    featureHeading = models.CharField()


class product_features_model(models.Model):
    productFeatureForignKey = models.ForeignKey(
        product_feature_model, related_name='product_features', on_delete=models.CASCADE)
    key = models.CharField()
    value = models.CharField()


class product_color_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE)
    color = models.CharField()


class product_image_model(models.Model):
    productColorForignKey = models.ForeignKey(
        product_color_model, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='productImages/%y')


class product_description_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE)
    description = models.CharField()


class product_storage_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE)
    ram = models.CharField(max_length=10)
    rom = models.CharField(max_length=10)
    incrementPrice = models.IntegerField()


class product_stock_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE , null=True, blank=True)
    
    productColorForignKey = models.ForeignKey(
        product_color_model, on_delete=models.CASCADE)
    productStorageForignKey = models.ForeignKey(
        product_storage_model, on_delete=models.CASCADE , null=True, blank=True)
    stock = models.IntegerField()


class product_keyword_model(models.Model):
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE , null=True,blank=True)
    keyword = models.CharField(max_length=40)


class product_cart_model(models.Model):
    userForignKey = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE , null=True,blank=True)
    productForignKey = models.ForeignKey(
        products_model, on_delete=models.CASCADE)
    productStockForignKey = models.ForeignKey(
        product_stock_model, on_delete=models.CASCADE)
    checked = models.BooleanField(default=False)
    quantity = models.IntegerField(default=0)