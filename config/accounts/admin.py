from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as UserBaseAdmin
from django.contrib.auth.models import Group
from .models import User
from .forms import UserChangeForm, UserCreateForm

class UserAdmin(UserBaseAdmin):
    form = UserChangeForm
    add_form = UserCreateForm
    
    list_display = ("phone_number", "email", "full_name", "is_admin")
    list_filter = ("is_admin", "is_active")
    readonly_fields = ("last_login",)
    
    
    
    fieldsets = (
        (None, {"fields": ("phone_number", "email", "full_name","password")}),
        ("permissions", {"fields": ("is_admin", "is_active", "last_login")})
    )
    
    add_fieldsets = (
        (None, {"fields": ("phone_number", "email", "full_name","password1", "password2")}),
    )
    
    search_fields = ("full_name", "email")
    ordering = ("full_name",)
    filter_horizontal = ()
    
    
admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
