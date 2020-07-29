from django.db import models
from datetime import datetime

# Create db models here

class Listing(models.Model):
    # Lets be a little conservative and only use 2 bytes
    JOB_TYPE_CHOICES = [
        ('C', 'Competition'),
        ('GS', 'Grant/Scholarship'),
        ('I', 'Internship'),
        ('P', 'Placement'),
        ('PT', 'Part Time'),
        ('FT', 'Full Time'),
        ('G', 'Graduate'),
    ]

    company = models.CharField(max_length=60, help_text="E.g. btecSolutions")
    image = models.FileField(upload_to="images/", blank=True, help_text="SVG preferably - 40x40 Pixels only or distortion will occur")
    role = models.CharField(max_length=60, help_text="E.g. Software Engineer")
    date = models.DateTimeField(default=datetime.now, help_text="The date and time the listing will be posted")
    full_salary = models.CharField(max_length=60, help_text="E.g. '£30,000 - £40,000 p.a.' or '£12.50 p.h.'")
    salary_preview = models.CharField(max_length=20, help_text="E.g. '£30K - £40K' or '£12.50/HR'")
    location = models.CharField(max_length=20, help_text="E.g. London")
    greater_location = models.CharField(max_length=20, null=True, blank=True, help_text="E.g. England")
    job_type = models.CharField(max_length=2, choices=JOB_TYPE_CHOICES)
    apply_url = models.URLField(help_text="The URL that the apply button will reroute to")
    mailto = models.URLField(max_length=255, help_text="The mailto link (preferably with ECSS in subject)")
    description = models.CharField(max_length=4000, help_text="The Markdown job description (max 4000 characters) See: https://www.markdownguide.org/basic-syntax/")

    def __str__(self):
        return f"{self.company} {self.role} {self.date}"