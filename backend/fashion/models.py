from django.db import models

# Create your models here.
class fashion(models.Model):
    brand=models.CharField(max_length=40)
    name=models.CharField(max_length=20)
    size=models.IntegerField(null=True,blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    desciption=models.TextField(blank=True,null=True)
    release_date=models.DateField(blank=True,null=True)
    available=models.BooleanField(default=True)
    image = models.ImageField(upload_to='fasion_images/')

    def _str_(self):
        return f"{self.brand}{self.name}{self.size}"
                          
                          
                          