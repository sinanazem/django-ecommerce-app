from django.shortcuts import render
from django.views import View
from blog.models import Blog



class HomeView(View):
    def get(self, request):
        blogs = Blog.objects.all()
        return render(request, "home/home.html", {"blogs":blogs})
    
    def post(self, request):
        pass




 
class AboutView(View):
    def get(self, request):
        
        return render(request, "home/about.html")
    
