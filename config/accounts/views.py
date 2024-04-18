from django.shortcuts import render, redirect
from django.views import View
from .forms import UserRegistrationForm
import random
from django.contrib import messages
from django.core.mail import send_mail
from .models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .forms import UserLoginForm

class UserRegistrationView(View):
    
    form_class = UserRegistrationForm
    template_name = "accounts/register.html"
    def get(self, request):
        form = self.form_class
        return  render(request, self.template_name, {"form":form})
    
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            print(cd)
            User.objects.create_user(cd["phone_number"], password=cd["password"], email=cd["email"], full_name=cd["full_name"])
            messages.success(request, "you are registered successfully!")
            return redirect("home:home")
        return render(request, self.template_name, {"form":form})
    
class UserLoginView(View):
    form_class = UserLoginForm
    template_name = "accounts/login.html"
    
    def get(self, request):
        form = self.form_class
        return render(request, self.template_name, {"form":form})
    
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, phone_number=cd["phone_number"], password=cd["password"])
            if user is not None:
                login(request, user)
                messages.success(request, "You are logged in Successfully!")
                return redirect("home:home")
            messages.error(request, "phone number or password is Wrong!", extra_tags="warning")
        
        
        return render(request, self.template_name, {"form":form})
        
    
class UserLogoutView(View):
    
    def get(self, request):
        logout(request)
        messages.success(request, "you are logout successfully!", extra_tags="success")
        return redirect("home:home")
