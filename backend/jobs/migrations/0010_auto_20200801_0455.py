# Generated by Django 3.0.8 on 2020-08-01 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_auto_20200731_0302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='job_type',
            field=models.CharField(choices=[('Competition', 'Competition'), ('Grant', 'Grant'), ('Scholarship', 'Scholarship'), ('Internship', 'Internship'), ('Placement', 'Placement'), ('Part-Time', 'Part Time'), ('Full-Time', 'Full Time'), ('Graduate', 'Graduate')], max_length=20),
        ),
    ]
