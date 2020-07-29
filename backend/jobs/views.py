from django.shortcuts import render

from rest_framework import viewsets

from .serializers import ListingSerializer
from .models import Listing

# Create views here
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('date')
    serializer_class = ListingSerializer
    http_method_names = ['get']