from django.urls import path
from .views import HomeView, ArticleView

app_name = "home"
urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('articles/', ArticleView.as_view(), name='article'),
]
