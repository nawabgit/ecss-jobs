from django.db import models
from datetime import datetime

# Create db models here

class Listing(models.Model):
    company = models.CharField(max_length=60)
    role = models.CharField(max_length=60)
    date = models.DateTimeField(default=datetime.now, blank=True)
    full_salary = models.CharField(max_length=60)
    salary_preview = models.CharField(max_length=20)
    location = models.CharField(max_length=20)
    greater_location = models.CharField(max_length=20)
    type = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.company} {self.role} {date}"