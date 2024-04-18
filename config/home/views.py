from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from .models import Product, Category
from .tasks import all_bucket_objects_task, delete_object_task, download_object_task
from django.contrib import messages
from utils import IsAdminUserMixin
from orders.forms import CartAddForm


class HomeView(View):
    def get(self, request, category_slug=None):
        products = Product.objects.filter(avalable=True)
        categories = Category.objects.filter(is_sub=False)
        
        if category_slug:
            category = Category.objects.get(slug=category_slug)
            products = products.filter(category=category)
        
        return render(request, "home/home.html", {"products":products, "categories":categories})
    
    
    
class ProductDetailView(View):
    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        forms = CartAddForm
        
        return render(request, "home/product_detail.html", {"product":product, "forms":forms})

class BucketHomeView(IsAdminUserMixin, View):
    template_name = "home/bucket.html"
    
    def get(self, request):
        objects = all_bucket_objects_task()
        return render(request, self.template_name, {"objects":objects})
    
class DeleteObjBucketView(IsAdminUserMixin, View):
    def get(self, request, key):
        delete_object_task.delay(key)
        messages.info(request, "your object will be delete soon.", extra_tags="info")
        return redirect("home:bucket")
    
class DownloadObjBucketView(IsAdminUserMixin, View):
    def get(self, request, key):
        download_object_task.delay(key)
        messages.info(request, "your object will be download soon.", extra_tags="info")
        return redirect("home:bucket")

