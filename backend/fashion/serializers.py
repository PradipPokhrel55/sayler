from rest_framework import serializers
from .models import fashion

class fasionSerializer(serializers.ModelSerializer):
    class Meta:
        model=fashion
        fields='__all__'