from api.product.product_model import Product
import django_filters

class ProductFilter(django_filters.FilterSet):
    prod_code = django_filters.CharFilter(lookup_expr='exact')
    prod_fullname = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['prod_code', 'prod_fullname']