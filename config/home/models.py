from django.db import models

class Article(models.Model):
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to="articles_image/%Y/%m/%d")
    author = models.CharField(max_length=50)
    reading_time = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    abstract = models.TextField()
    description = models.TextField()
    
    def __str__(self):
        return self.title
    
