# Generated by Django 4.2.6 on 2023-11-06 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disponibilidad', '0009_remove_profesorcurso_planificacionacademica_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profesor',
            name='bloqueoSemestral',
            field=models.BooleanField(default=1),
        ),
        migrations.AddField(
            model_name='profesor',
            name='bloqueoTrimestral',
            field=models.BooleanField(default=1),
        ),
        migrations.AddField(
            model_name='profesor',
            name='periodoSemestral',
            field=models.BooleanField(default=1),
        ),
        migrations.AddField(
            model_name='profesor',
            name='periodoTrimestral',
            field=models.BooleanField(default=1),
        ),
    ]