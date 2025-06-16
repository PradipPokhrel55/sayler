from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import shoes
from .serializers import shoesSerializer

class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class ShoesView(viewsets.ModelViewSet):
    serializer_class = shoesSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductPagination

    def get_queryset(self):
        return shoes.objects.filter(available=True)

    def retrieve(self, request, pk=None):
        # Retrieve a specific shoe product by ID
        product = get_object_or_404(shoes, pk=pk)
        serializer = shoesSerializer(product)
        return Response(serializer.data)

    # Optional: Override list method if you want custom behavior
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = shoesSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = shoesSerializer(queryset, many=True)
        return Response(serializer.data)
