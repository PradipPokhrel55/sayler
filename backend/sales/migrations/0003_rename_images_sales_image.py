# Generated by Django 5.1.1 on 2024-10-16 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0002_alter_sales_device_alter_sales_model'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sales',
            old_name='images',
            new_name='image',
        ),
    ]
