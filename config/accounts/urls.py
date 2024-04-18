from django.urls import path, include
from .views import UserRegistrationView, UserLogoutView, UserLoginView

app_name="accounts"

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="user_register"),
    path('login/', UserLoginView.as_view(), name="user_login"),
    path('logout/', UserLogoutView.as_view(), name="user_logout"),
]