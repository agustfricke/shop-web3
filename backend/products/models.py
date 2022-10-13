from django.db import models
from users.models import User

class Product(models.Model):
    user            = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name            = models.CharField(max_length=250, null=True, blank=True)
    image           = models.ImageField(null=True, blank=True, default='/placeholder.jpg')
    brand           = models.CharField(max_length=250, null=True, blank=True)
    category        = models.CharField(max_length=250, null=True, blank=True)
    description     = models.TextField(null=True, blank=True)
    rating          = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    num_reviews     = models.IntegerField(null=True, blank=True, default=0)
    price           = models.DecimalField(max_digits=10, decimal_places=10, null=True, blank=True)
    count_in_stock  = models.IntegerField(null=True, blank=True, default=0)
    created         = models.DateTimeField(auto_now_add=True)
    _id             = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product         = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user            = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name            = models.CharField(max_length=250, null=True, blank=True)
    rating          = models.IntegerField(null=True, blank=True, default=0)
    comment         = models.TextField(null=True, blank=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    _id             = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)