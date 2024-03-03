from django.shortcuts import render
from django.views import View
from .models import Article


class HomeView(View):
    def get(self, request):
        articles = Article.objects.all()
        return render(request, "home/home.html", {"articles":articles})
    def post(self, request):
        pass



class ArticleView(View):
    def get(self, request):
        articles = Article.objects.all()
        return render(request, "home/articles.html",{"articles":articles})
    
class CommunityView(View):
    def get(self, request):
        
        return render(request, "home/community.html")
    
class AboutView(View):
    def get(self, request):
        
        return render(request, "home/about.html")
    
