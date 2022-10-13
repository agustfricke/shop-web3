from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('register/', views.register),
    path('profile/', views.get_user_profile),
    path('profile/update/', views.update_user_profile),
    path('profile/image/', views.upload_image),
    path('', views.get_users),
    path('<str:pk>/', views.get_user_by_id),
    path('profile/image/', views.upload_image),
    path('delete/<str:pk>/', views.delete_user),
    path('update/<str:pk>/', views.update_user, name='user-update'), 


]