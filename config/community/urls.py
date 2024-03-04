from django.urls import path
from .views import CommunityView

app_name = "community"
urlpatterns = [
    path('', CommunityView.as_view(), name='community'),
]
