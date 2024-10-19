from rest_framework import serializers 
from .models import sales

class salesSerializer(serializers.ModelSerializer):
    class Meta:
        model = sales
        fields= '__all__'