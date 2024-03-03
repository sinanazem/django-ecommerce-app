from django.shortcuts import render, redirect
from django.views import View
from .forms import UserRegistrationForm, UserLoginForm
from .models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

class UserRegistrationView(View):
    form_class = UserRegistrationForm
    template_name = "accounts/user_register.html"
    
    def get(self, request):
        form = self.form_class
        return render(request, self.template_name, {"form":form})
    
    def post(self, request):
        form = self.form_class(request.POST)   
        if form.is_valid():
            cd = form.cleaned_data
            User.objects.create_user(
                phone_number = cd["phone_number"],
                email = cd["email"],
                full_name = cd["full_name"],
                password = cd["password"]
                )
            messages.success(request, "You Registerd Successfully!", extra_tags="success")
            return redirect("home:home")
        
        return render(request, self.template_name, {"form":form})
    
            

class UserLoginView(View):
    form_class = UserLoginForm
    template_name = "accounts/user_login.html"
    
    def get(self, request):
        form = self.form_class
        return render(request, self.template_name, {"form":form})
    
    def post(self, request):
        form = self.form_class(request.POST)   
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, phone_number=cd["phone_number"], password=cd["password"])
            if user:
                login(request, user)
                messages.success(request, "You are Logged in Successfully!", extra_tags="success")
                return redirect("home:home")
            
            messages.error(request, "your Phone number or password in not valid", extra_tags="error")
        
        return render(request, self.template_name, {"form":form})


class UserLogoutView(View):
    
    def get(self, request):
        logout(request)
        messages.success(request, "You Logged out Successfully!", extra_tags="success")
        
        return redirect("home:home") 