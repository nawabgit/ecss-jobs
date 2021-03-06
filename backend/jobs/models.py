from django.db import models
from django.utils.text import slugify

from datetime import datetime

# Create db models here

class Company(models.Model):
    name = models.CharField(max_length=60, help_text="E.g. btecSolutions")
    image = models.FileField(upload_to="logos/", blank=True, default="logos/ecsslogo.png", help_text="SVG highly preferable - 1:1 aspect ratio only")

    def __str__(self):
        return f"{self.name}"


class Sponsor(models.Model):
    SPONSOR_TYPE_CHOICES = [
        ('gold', 'Gold'),
        ('silver', 'Silver'),
        ('bronze', 'Bronze'),
    ]

    company = models.OneToOneField(Company, on_delete=models.CASCADE, help_text="The sponsor must be an existing Company")
    sponsor_level = models.CharField(max_length=20, choices=SPONSOR_TYPE_CHOICES)

    description = models.TextField(help_text="A paragraph or so describing the company")
    website = models.URLField(help_text="A URL to the company's website")

    def __str__(self):
        return f"{self.company.name}"


class Listing(models.Model):
    JOB_TYPE_CHOICES = [
        ('Competition', 'Competition'),
        ('Grant', 'Grant'),
        ('Scholarship', 'Scholarship'),
        ('Internship', 'Internship'),
        ('Placement', 'Placement'),
        ('Part-Time', 'Part Time'),
        ('Full-Time', 'Full Time'),
        ('Graduate', 'Graduate'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    role = models.CharField(max_length=60, help_text="E.g. Software Engineer")
    date = models.DateTimeField(default=datetime.now, help_text="The date and time the listing will be posted")
    full_salary = models.CharField(max_length=60, help_text="E.g. '£30,000 - £40,000 p.a.' or '£12.50 p.h.'")
    salary_preview = models.CharField(max_length=20, help_text="E.g. '£30K - £40K' or '£12.50/HR'")
    location = models.CharField(max_length=20, help_text="E.g. London")
    greater_location = models.CharField(max_length=20, null=True, blank=True, help_text="E.g. England")
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    apply_url = models.URLField(help_text="The URL that the apply button will reroute to")
    mailto = models.CharField(max_length=255, help_text="The mailto link (preferably with ECSS in subject)")
    description = models.TextField(help_text="The Markdown job description. See: https://www.markdownguide.org/basic-syntax/")
    slug = models.SlugField(max_length=255,blank=True, null=True,editable=False, unique=True)
    
    def __str__(self):
        return f"{self.company} {self.job_type} {self.role} {self.date}"

    def save(self, **kwargs):
        super(Listing, self).save(**kwargs)
        if not self.slug:
            self.slug = slugify(self.company.name) + "-" + slugify(self.role)+ "-" + str(self.id)
            self.save()