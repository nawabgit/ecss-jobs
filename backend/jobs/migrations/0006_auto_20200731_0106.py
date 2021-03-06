# Generated by Django 3.0.8 on 2020-07-31 00:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_auto_20200729_0240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='E.g. btecSolutions', max_length=60)),
                ('image', models.FileField(blank=True, help_text='SVG highly preferable - 1:1 aspect ratio only', upload_to='images/')),
            ],
        ),
        migrations.RemoveField(
            model_name='listing',
            name='image',
        ),
        migrations.AlterField(
            model_name='listing',
            name='company',
            field=models.CharField(max_length=60),
        ),
        migrations.AlterField(
            model_name='listing',
            name='description',
            field=models.TextField(help_text='The Markdown job description (max 4000 characters) See: https://www.markdownguide.org/basic-syntax/'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='job_type',
            field=models.CharField(choices=[('competition', 'Competition'), ('grant', 'Grant'), ('scholarship', 'Scholarship'), ('internship', 'Internship'), ('placement', 'Placement'), ('part-time', 'Part Time'), ('full-time', 'Full Time'), ('graduate', 'Graduate')], max_length=20),
        ),
        migrations.AlterField(
            model_name='listing',
            name='mailto',
            field=models.TextField(help_text='The mailto link (preferably with ECSS in subject)'),
        ),
        migrations.CreateModel(
            name='Sponsor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sponsor_level', models.CharField(choices=[('gold', 'Gold'), ('silver', 'Silver'), ('bronze', 'Bronze')], max_length=20)),
                ('description', models.TextField()),
                ('website', models.URLField()),
                ('company', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='jobs.Company')),
            ],
        ),
    ]
