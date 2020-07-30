# Generated by Django 3.0.8 on 2020-07-29 01:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20200729_0126'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='apply_url',
            field=models.URLField(default='company.com'),
        ),
        migrations.AddField(
            model_name='listing',
            name='image',
            field=models.FileField(blank=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='listing',
            name='mailto',
            field=models.URLField(default='email@company.com', max_length=255),
        ),
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='listing',
            name='greater_location',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='job_type',
            field=models.CharField(choices=[('C', 'Competition'), ('GS', 'Grant/Scholarship'), ('I', 'Internship'), ('P', 'Placement'), ('PT', 'Part Time'), ('FT', 'Full Time'), ('G', 'Graduate')], default='I', max_length=2),
        ),
    ]