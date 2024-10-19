from django.db import models

# Create your models here.

class watches(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='watches_images/')
    def __str__(self):
        return f"{self.brand} {self.model}"