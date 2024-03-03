from django.shortcuts import render
from django.views import View
from .models import Course


class CourseView(View):
    def get(self, request):
        courses = Course.objects.all()
        return render(request, "courses/courses.html", {"courses":courses})
    
class CourseDetailView(View):
    
    def get(self, request, slug_id):
        course = Course.objects.get(slug=slug_id)
        return render(request, "courses/course_detail.html", {"course":course})