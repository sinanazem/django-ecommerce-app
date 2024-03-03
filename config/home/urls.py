from django.urls import path
from .views import HomeView, ArticleView, CommunityView, AboutView

app_name = "home"
urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('articles/', ArticleView.as_view(), name='article'),
    path('community/', CommunityView.as_view(), name='community'),
    path('about/', AboutView.as_view(), name='about'),
]
