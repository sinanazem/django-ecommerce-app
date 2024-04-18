from django.db import models
from django.urls import reverse

class Category(models.Model):
    sub_category = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True, related_name="scategory")
    is_sub = models.BooleanField(default=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    
    class Meta:
        ordering = ("name", )
        verbose_name = "category"
        verbose_name_plural  = "categories"
        
    def __str__(self):
        return self.name
        

class Product(models.Model):
    category = models.ManyToManyField(Category, related_name="products")
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    avalable = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"{self.name}"
    
    
    # def get_absolute_url(self):
    #     return reverse("home:product_detail", args=self.slug)
    
