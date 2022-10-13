from rest_framework import serializers
from .models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user']
        user = serializers.HiddenField(default=serializers.CurrentUserDefault())

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data