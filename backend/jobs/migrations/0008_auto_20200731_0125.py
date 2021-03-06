# Generated by Django 3.0.8 on 2020-07-31 00:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0007_auto_20200731_0113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='company',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='jobs.Company'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='mailto',
            field=models.CharField(help_text='The mailto link (preferably with ECSS in subject)', max_length=255),
        ),
    ]
