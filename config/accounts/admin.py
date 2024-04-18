from django.contrib import admin
from .models import  User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .forms import UserCreationForm, UserChangeForm

class UserAdimin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    
    list_display = ("phone_number", "email", "full_name", "is_admin")
    list_filter = ("is_admin", "is_active")
    readonly_fields = ("last_login",)
    
    fieldsets = (
        (None, {"fields": ("phone_number", "email", "full_name", "password")}),
        ("permissions", {"fields": ("is_admin", "is_active", "last_login")}),
    )
    add_fieldsets = (
        (None, {"fields": ("phone_number", "email", "full_name", "password1", "password2")}),
    )
    
    search_fields = ("email", "full_name")
    ordering = ("full_name",)
    filter_horizontal = ()


class OptCodeAdmin(admin.ModelAdmin):
    list_display = ("phone_number", "code", "created")
    
admin.site.unregister(Group)
admin.site.register(User, UserAdimin)
