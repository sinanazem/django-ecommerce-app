from django.urls import path
from .views import UserRegistrationView

app_name = "accounts"
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="user_register"),
]
