from django import forms
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField



class UserCreateForm(forms.ModelForm):
    
    password1 = forms.CharField(label="password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="confirm password", widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ("phone_number", "email", "full_name")
        
    def clean_password2(self):
        cd = self.cleaned_data
        if cd["password1"] and cd["password2"] and cd["password1"] != cd["password2"]:
            raise ValidationError(" your passwords not match!")
        return cd["password2"]
        
        
    
    def save(self, commit=True):
        user = super().save(commit=False)
        cd = self.cleaned_data
        user.set_password(cd["password2"])
        if commit:
            user.save()
        return user
    

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(help_text = "you can reset your password with <a href=\" ../password \"> this link </a>")
    class Meta:
        model = User
        fields = ("phone_number", "email", "full_name", "password", "last_login")
        
from django import forms

class UserRegistrationForm(forms.Form):
    
    phone_number = forms.CharField(max_length=11, widget=forms.TextInput(attrs={"class": "form-control"}))
    email = forms.EmailField(max_length=255, widget=forms.TextInput(attrs={"class": "form-control"}))
    full_name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={"class": "form-control"}))
    password = forms.CharField(label="Password", widget=forms.PasswordInput(attrs={"class": "form-control"}))

    
        