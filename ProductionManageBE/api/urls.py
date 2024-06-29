from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from api.customer.customer_views import (
    CustomerListCreateView,
    CustomerRetrieveUpdateDestroyView,
)
from api.product.product_views import (
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
)
from api.user.user_views import UserListCreate, UserRetrieveUpdateDestroyView

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/users/", UserListCreate.as_view(), name="users_list_create"),
    path("api/users/<int:pk>/", UserRetrieveUpdateDestroyView.as_view(), name="users_update_destroy"),
    path(
        "api/customers/", CustomerListCreateView.as_view(), name="customers_list_create"
    ),
    path(
        "api/customers/<int:pk>/",
        CustomerRetrieveUpdateDestroyView.as_view(),
        name="customers_update_destroy",
    ),
    path("api/products/", ProductListCreateView.as_view(), name="products_list_create"),
    path(
        "api/products/<int:pk>/",
        ProductRetrieveUpdateDestroyView.as_view(),
        name="products_update_destroy",
    ),
]
