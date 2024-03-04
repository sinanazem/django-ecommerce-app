from django.contrib import admin
from .models import Blog


class BlogAdmin(admin.ModelAdmin):

    list_display = ("title", "author", "abstract")
    list_filter = ("created", "updated")
    search_fields = ("description", "abstract", "author")
    
    
admin.site.register(Blog, BlogAdmin)
