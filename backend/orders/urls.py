from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_orders), 
    path('add/', views.add_order_items),
    path('my-orders/', views.get_my_orders),
    path('<str:pk>/deliver/', views.update_order_to_delivered),
    path('<str:pk>/', views.get_order_by_id),
    path('<str:pk>/pay/', views.update_order_to_paid),
]