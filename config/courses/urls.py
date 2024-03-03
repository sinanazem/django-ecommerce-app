from django.urls import path
from .views import CourseView, CourseDetailView

app_name = "courses"
urlpatterns = [
    path('', CourseView.as_view(), name='courses'),
    path('<slug:slug_id>/', CourseDetailView.as_view(), name='course_detail'),
]
