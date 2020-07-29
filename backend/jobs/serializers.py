from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Listing
        fields = ('company', 'role', 'date', 'full_salary' , 'salary_preview' , 'location' , 'greater_location' , 'job_type', 'description')