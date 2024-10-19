from rest_framework import serializers
from .models import watches

class WatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = watches
        fields ='__all__'




        