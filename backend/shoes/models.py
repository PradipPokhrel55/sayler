from django.db import models

# Create your models here.
class shoes(models.Model):
    brand=models.CharField(max_length=20)
    name=models.CharField(max_length=40)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    description=models.TextField(blank=True,null=True)
    release_date=models.DateTimeField(blank=True,null=True)
    available=models.BooleanField(default=True)
    image = models.ImageField(upload_to='cosmetics_images/')

    def _str_(self):
        return f"{self.brand}{self.name}"