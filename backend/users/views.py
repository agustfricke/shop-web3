from site import makepath
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import User
from .serializers import  UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password  
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializers = UserSerializerWithToken(self.user).data

        for k, v in serializers.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create(
            user_name=data['user_name'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.user_name = data['user_name']
    user.bio = data['bio']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    data = request.data
    user_id = data['user_id']
    user = User.objects.get(id=user_id)
    user.image = request.FILES.get('image')
    user.save()
    return Response('Image was uploaded')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    data = request.data
    user_id = data['user_id']
    user = User.objects.get(id=user_id)
    user.image = request.FILES.get('image')
    user.save()
    return Response('Image was uploaded')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    user_for_delete = User.objects.get(id=pk)
    user_for_delete.delete()
    return Response('User was deleted')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    user = User.objects.get(id=pk)

    data = request.data
    user.user_name = data['user_name']
    user.email = data['email']
    user.is_staff = data['is_admin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)




