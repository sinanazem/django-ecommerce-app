from django.db import models


class Course(models.Model):
  
  title = models.CharField(max_length=200)
  slug = models.SlugField()
  description = models.TextField()
  image = models.ImageField(upload_to="course_img/")
  price = models.IntegerField()
  time = models.CharField(max_length=200)
  enrolled_number = models.IntegerField()
  
  
