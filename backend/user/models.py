from django.db import models


class userDetails(models.Model):
    
    name = models.CharField(max_length=100, default='default_name')
    email = models.EmailField()
    password=models.CharField(max_length=20)