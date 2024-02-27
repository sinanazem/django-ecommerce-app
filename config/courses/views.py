from django.shortcuts import render
from django.views import View


class CourseView(View):
    def get(self, request):
        return render(request, "courses/courses.html")