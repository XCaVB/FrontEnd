# Generated by Django 4.2.6 on 2023-11-23 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disponibilidad', '0012_profesor_modulosdiurno_profesor_modulosvespertino'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profesor',
            name='carrera',
            field=models.CharField(default='-', max_length=45),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='departamento',
            field=models.CharField(default='-', max_length=45),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='jornada',
            field=models.CharField(default='-', max_length=45),
        ),
    ]
