from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from api.base.custom_pagination import CustomLimitOffsetPagination
from api.user.user_filter import UserFilter
from api.user.user_serializer import UserSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomLimitOffsetPagination
    filterset_class = UserFilter
    ordering_fields = ['username', 'email']
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        request.data["password"] = make_password(request.data["password"])
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
