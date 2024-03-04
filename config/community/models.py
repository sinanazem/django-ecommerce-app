from django.db import models

class ProfileCommunityModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    job_postion = models.CharField(max_length=100, blank=True, null=True)
    telegram_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    x_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    
    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
