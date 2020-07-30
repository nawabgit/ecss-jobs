# Generated by Django 3.0.8 on 2020-07-29 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_auto_20200729_0101'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='type',
            new_name='job_type',
        ),
        migrations.AddField(
            model_name='listing',
            name='description',
            field=models.CharField(default=None, max_length=4000),
            preserve_default=False,
        ),
    ]