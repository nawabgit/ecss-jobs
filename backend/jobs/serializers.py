from rest_framework import serializers
from .models import Listing, Company, Sponsor

class ListingSerializer(serializers.HyperlinkedModelSerializer):
    company = serializers.SerializerMethodField()
    
    def get_company(self, obj):
        if hasattr(obj.company, 'sponsor'):
            return SponsorSerializer(obj.company.sponsor).data
        else:
            return CompanySerializer(obj.company).data

    class Meta:
        model = Listing
        fields = ('company', 'role', 'date', 'full_salary' , 'salary_preview' , 'location' , 'greater_location' , 'job_type', 'apply_url', 'mailto', 'description', 'slug')


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ('name', 'image')

        
class SponsorSerializer(serializers.HyperlinkedModelSerializer):
    # We could just use the CompanySerializer to retrieve these,
    #  but then they are nested
    name = serializers.CharField(source='company.name')
    image = serializers.FileField(source='company.image')

    class Meta:
        model = Sponsor
        fields = ('name', 'image', 'sponsor_level', 'description', 'website')