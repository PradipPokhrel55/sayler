from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import Electronics
from .serializers import ElectronicsSerializer

class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class electronicsview(viewsets.ModelViewSet):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        return Electronics.objects.filter(available=True)

    def retrieve(self, request, pk=None):
        
        product = get_object_or_404(Electronics, pk=pk)
        serializer = ElectronicsSerializer(product)
        return Response(serializer.data)

    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ElectronicsSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ElectronicsSerializer(queryset, many=True)
        return Response(serializer.data)
