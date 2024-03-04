from django.shortcuts import render
from django.views import View
from .models import Blog


class BlogView(View):
    def get(self, request):
        blogs = Blog.objects.all()
        return render(request, "blog/blog.html",{"blogs":blogs})
