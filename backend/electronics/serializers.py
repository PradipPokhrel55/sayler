from rest_framework import serializers
from .models import Electronics

class ElectronicsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Electronics
        fields='__all__'