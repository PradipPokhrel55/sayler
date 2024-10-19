from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import watches  # Ensure the model name is capitalized
from .serializers import WatchSerializer  # Ensure correct naming convention

class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'  

class WatchViewSet(viewsets.ModelViewSet):
    serializer_class = WatchSerializer
    pagination_class = ProductPagination
    permission_classes = [AllowAny]  # Corrected to permission_classes

    def get_queryset(self):
        # Fetch only available watches
        return watches.objects.filter(available=True)  # Capitalized the model name

    def retrieve(self, request, pk=None):
        # Retrieve a specific watch product by ID
        product = get_object_or_404(watches, pk=pk)  # Ensure consistent capitalization
        serializer = WatchSerializer(product)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = WatchSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = WatchSerializer(queryset, many=True)
        return Response(serializer.data)
