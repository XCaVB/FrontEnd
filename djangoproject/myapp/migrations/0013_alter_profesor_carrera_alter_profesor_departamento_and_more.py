# Generated by Django 4.2.5 on 2023-10-18 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_remove_user_date_joined_profesor_carrera_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profesor',
            name='carrera',
            field=models.CharField(max_length=45),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='departamento',
            field=models.CharField(max_length=45),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='jornada',
            field=models.CharField(max_length=45),
        ),
    ]