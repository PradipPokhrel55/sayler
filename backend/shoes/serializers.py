from rest_framework import serializers
from .models import shoes

class shoesSerializer(serializers.ModelSerializer):
    class Meta:
        model=shoes
        fields = '__all__'