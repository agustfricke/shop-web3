from rest_framework import serializers
from .models import Order, Orderitem, ShippingAddress
from users.serializers import UserSerializer


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderitemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderitem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderitemSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data