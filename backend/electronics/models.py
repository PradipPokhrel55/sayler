from django.db import models

# Create your models here.
class Electronics(models.Model):
    brand=models.CharField(max_length=40)
    device=models.CharField((""), max_length=50)
    model=models.CharField(max_length=40)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    desciption=models.TextField(blank=True,null=True)
    release_date=models.DateField(blank=True,null=True)
    available=models.BooleanField(default=True)
    image=models.ImageField(upload_to='electronics_images/')

    def _str_(self):
        return f"{self.brand}{self.device}"
    
    class Meta:
        ordering = ['-release_date']