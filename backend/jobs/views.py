from django.shortcuts import render

from rest_framework import viewsets

from .serializers import ListingSerializer, CompanySerializer, SponsorSerializer
from .models import Listing, Company, Sponsor

# Create views here
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('date')
    serializer_class = ListingSerializer
    http_method_names = ['get']

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    http_method_names = ['get']

    
class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsor.objects.all()
    serializer_class = SponsorSerializer
    http_method_names = ['get']