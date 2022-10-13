from django.db import models
from users.models import User
from products.models import Product

class Order(models.Model):
    user            = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    shipping_price  = models.DecimalField(max_digits=10, decimal_places=10, null=True, blank=True)
    total_price     = models.DecimalField(max_digits=10, decimal_places=10, null=True, blank=True)
    paid_date       = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_delivered    = models.BooleanField(default=False)
    delivered_at    = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    _id             = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.created_at)


class Orderitem(models.Model):
    product         = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order           = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name            = models.CharField(max_length=250, null=True, blank=True)
    quantity        = models.IntegerField(null=True, blank=True, default=0)
    price           = models.DecimalField(max_digits=10, decimal_places=10, null=True, blank=True)
    image           = models.CharField(max_length=250, null=True, blank=True)
    _id             = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order           = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address         = models.CharField(max_length=250, null=True, blank=True)
    city            = models.CharField(max_length=100, null=True, blank=True)
    postal_code     = models.CharField(max_length=100, null=True, blank=True)
    country         = models.CharField(max_length=100, null=True, blank=True)
    shipping_price  = models.DecimalField(max_digits=10, decimal_places=10, null=True, blank=True)
    _id             = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address