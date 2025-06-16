from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import sales
from .serializers import salesSerializer

class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class salesview(viewsets.ModelViewSet):
    serializer_class = salesSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        return sales.objects.filter(available=True)

    def retrieve(self, request, pk=None):
        # Retrieve a specific sales item by ID
        product = get_object_or_404(sales, pk=pk)
        serializer = salesSerializer(product)
        return Response(serializer.data)

    # Optional: Override list method if you want custom behavior
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = salesSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = salesSerializer(queryset, many=True)
        return Response(serializer.data)
