# Generated by Django 4.2.6 on 2023-11-22 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auditoria', '0002_delete_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='auditoria',
            name='objetivo',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='auditoria',
            name='evento',
            field=models.CharField(default='', max_length=255),
        ),
    ]
