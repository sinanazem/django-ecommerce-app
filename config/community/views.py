from django.shortcuts import render
from django.views import View
from .models import ProfileCommunityModel


class CommunityView(View):
    def get(self, request):
        profiles = ProfileCommunityModel.objects.all()
        
        return render(request, "community/community.html", {"profiles":profiles})
