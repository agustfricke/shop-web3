from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products),
    path('create/', views.create_new_product),
    path('upload/', views.upload_image),
    path('<str:pk>/reviews/', views.create_product_review),
    path('last/', views.get_last_products),
    path('<str:pk>', views.get_product),
    path('update/<str:pk>/', views.update_product),
    path('delete/<str:pk>/', views.delete_product),
]