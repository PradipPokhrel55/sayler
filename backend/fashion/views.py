from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import fashion
from .serializers import fasionSerializer

class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class fasionviewset(viewsets.ModelViewSet): 
    serializer_class = fasionSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        return fashion.objects.filter(available=True)

    def retrieve(self, request, pk=None):
        # Retrieve a specific fashion product by ID
        product = get_object_or_404(fashion, pk=pk)
        serializer = fasionSerializer(product)
        return Response(serializer.data)

    # Optional: Override list method if you want custom behavior
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = fasionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = fasionSerializer(queryset, many=True)
        return Response(serializer.data)
