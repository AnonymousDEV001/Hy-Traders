# Generated by Django 4.2.7 on 2023-12-19 17:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('provider', models.CharField(default='email')),
                ('is_verified', models.BooleanField(default=False)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='catagory_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('catagory', models.CharField()),
                ('image', models.ImageField(upload_to='categories/%y')),
            ],
        ),
        migrations.CreateModel(
            name='product_color_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField()),
            ],
        ),
        migrations.CreateModel(
            name='product_feature_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('featureHeading', models.CharField()),
            ],
        ),
        migrations.CreateModel(
            name='social_auth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('access_token', models.TextField()),
                ('provider', models.CharField(max_length=100)),
                ('foreignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='oauth_access_tokens', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='products_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField()),
                ('thumbnail', models.ImageField(upload_to='thumbnails/%y')),
                ('offPrice', models.CharField()),
                ('price', models.CharField()),
                ('sales', models.IntegerField(default=0)),
                ('ready', models.BooleanField(default=False)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('lastupdated', models.DateTimeField(auto_now=True)),
                ('catagoryForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.catagory_model')),
            ],
        ),
        migrations.CreateModel(
            name='product_storage_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ram', models.CharField(max_length=10)),
                ('rom', models.CharField(max_length=10)),
                ('incrementPrice', models.IntegerField()),
                ('productForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model')),
            ],
        ),
        migrations.CreateModel(
            name='product_stock_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.IntegerField()),
                ('productColorForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.product_color_model')),
                ('productForignKey', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model')),
                ('productStorageForignKey', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.product_storage_model')),
            ],
        ),
        migrations.CreateModel(
            name='product_keyword_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=40)),
                ('productForignKey', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model')),
            ],
        ),
        migrations.CreateModel(
            name='product_image_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='productImages/%y')),
                ('productColorForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.product_color_model')),
            ],
        ),
        migrations.CreateModel(
            name='product_features_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField()),
                ('value', models.CharField()),
                ('productFeatureForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_features', to='myapp.product_feature_model')),
            ],
        ),
        migrations.AddField(
            model_name='product_feature_model',
            name='productForignKey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='features', to='myapp.products_model'),
        ),
        migrations.CreateModel(
            name='product_description_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField()),
                ('productForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model')),
            ],
        ),
        migrations.AddField(
            model_name='product_color_model',
            name='productForignKey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model'),
        ),
        migrations.CreateModel(
            name='product_cart_model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checked', models.BooleanField(default=False)),
                ('quantity', models.IntegerField(default=0)),
                ('productForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.products_model')),
                ('productStockForignKey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.product_stock_model')),
                ('userForignKey', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
