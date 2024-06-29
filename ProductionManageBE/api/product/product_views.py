from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.base.custom_pagination import CustomLimitOffsetPagination
from api.product.product_filter import ProductFilter
from api.product.product_model import Product
from api.product.product_serializer import ProductSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomLimitOffsetPagination
    filterset_class = ProductFilter
    ordering_fields = ['prod_code', 'prod_fullname', 'created_at']
    permission_classes = [IsAuthenticated]


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
