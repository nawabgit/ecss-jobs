from django.contrib import admin
from .models import Listing, Company, Sponsor

# Register models here
admin.site.register(Listing)
admin.site.register(Company)
admin.site.register(Sponsor)