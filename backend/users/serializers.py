from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'user_name', 'email', 'is_admin', 'bio', 'first_name', 'image']

    def get_is_admin(self, obj):
        return obj.is_staff

    def get__id(self, obj): 
        return obj.id

    def get_name(self, obj):
        name = obj.user_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'user_name', 'first_name',
                  'email', 'is_admin', 'token', 'bio', 'image']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)