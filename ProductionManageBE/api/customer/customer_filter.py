
import django_filters
from api.customer.customer_model import Customer

class CustomerFilter(django_filters.FilterSet):
    cust_code = prod_code = django_filters.CharFilter(lookup_expr='exact')
    cust_name = django_filters.CharFilter(lookup_expr='icontains') 
    cust_company = django_filters.CharFilter(lookup_expr='icontains') 

    class Meta:
        model = Customer
        fields = ['cust_code', 'cust_name', 'cust_company']