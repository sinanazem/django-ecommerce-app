from .models import User
from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="confirm password", widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ("email", "phone_number", "full_name")
        
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
    password = ReadOnlyPasswordHashField(help_text="you cant changed using <a href=\"../password/ \"> this form </a> ")
    class Meta:
        model = User
        fields = ("email", "phone_number", "full_name","password", "last_login")
        
        
class UserRegistrationForm(forms.Form):
    
    email = forms.EmailField()
    phone_number = forms.CharField(max_length=11)
    full_name = forms.CharField(max_length=50)
    password = forms.CharField(label = "password", widget=forms.PasswordInput)
    
    
    def clean_email(self):
        email = self.cleaned_data["email"]
        user = User.objects.filter(email=email).exists()
        if user:
            raise forms.ValidationError("Email Already Exists!")
        return email
    
    def clean_phone_number(self):
        phone_number = self.cleaned_data["phone_number"]
        user = User.objects.filter(phone_number=phone_number).exists()
        if user:
            raise forms.ValidationError("Phone Number Already Exists!")
        return phone_number
    
class UserLoginForm(forms.Form):
    
    phone_number = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
