# Generated by Django 4.2.6 on 2023-11-07 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('disponibilidad', '0010_profesor_bloqueosemestral_profesor_bloqueotrimestral_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProfesorCurso',
        ),
    ]
