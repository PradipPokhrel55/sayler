from django.db import models

# Create your models here.
class sales(models.Model):
    name=models.CharField(max_length=20)
    brand=models.CharField(max_length=20)
    size=models.IntegerField(null=True,blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    description= models.TextField(null=True,blank=True)
    release_date = models.DateField(null=True,blank=True)
    available = models.BooleanField(default=True)
    device = models.CharField(max_length=20,null=True,blank=True)
    model= models.CharField(max_length=20,null=True,blank=True)
    image = models.ImageField(upload_to='sales_images/')

    def _str_(self):
        return f"{self.name}"