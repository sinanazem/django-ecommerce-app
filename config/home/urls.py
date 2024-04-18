from django.urls import path, include
from .views import HomeView, ProductDetailView, BucketHomeView, DeleteObjBucketView, DownloadObjBucketView

app_name = "home"

bucket_urls = [
    path('', BucketHomeView.as_view(), name="bucket" ),
    path('delete_obj_bucket/<str:key>', DeleteObjBucketView.as_view(), name="delete_obj_bucket"),
    path('download_obj_bucket/<str:key>', DownloadObjBucketView.as_view(), name="download_obj_bucket"),
]

urlpatterns = [
    path('', HomeView.as_view(), name="home" ),
    path('category/<slug:category_slug>', HomeView.as_view(), name="category_filter" ),
    path('bucket/', include(bucket_urls)),
    path('<slug:slug>/', ProductDetailView.as_view(), name="product_detail" ),
]