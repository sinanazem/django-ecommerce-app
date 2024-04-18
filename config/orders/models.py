from django.db import models
from django.contrib.auth import get_user_model
from home.models import Product
from django.core.validators import MinValueValidator, MaxValueValidator


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="orders")
    paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    discount = models.IntegerField(null=True, blank=True, default=None)
    
    class Meta:
        ordering = ("paid", "-updated")
        
    def __str__(self):
        return f"{self.user} - {str(self.id)}"
    
    def get_total_price(self):
        total = sum(item.get_cost() for item in self.items.all())
        if self.discount:
            disccount_price = (self.discount / 100) * total
            return total - disccount_price
        
        return total


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity =  models.IntegerField(default=1)
    price = models.IntegerField()
    
    def __str__(self):
        return str(self.id)
    
    def get_cost(self):
        return self.quantity * self.price

class Coupon(models.Model):
    
    code = models.CharField(max_length=30, unique=True)
    valid_form = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(90)])
    active = models.BooleanField(default=False)
    
    def __str__(self):
        return self.code