# Generated by Django 5.1.1 on 2024-10-03 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetails',
            name='rpassword',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='username',
        ),
        migrations.AddField(
            model_name='userdetails',
            name='name',
            field=models.CharField(default='default_name', max_length=100),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='email',
            field=models.EmailField(max_length=254),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='password',
            field=models.CharField(max_length=20),
        ),
    ]