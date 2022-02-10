# Generated by Django 3.2.12 on 2022-02-10 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0002_auto_20220210_0950'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.RenameField(
            model_name='appointment',
            old_name='time',
            new_name='end_time',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='location',
        ),
        migrations.RemoveField(
            model_name='business',
            name='cost',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='status',
        ),
        migrations.AddField(
            model_name='appointment',
            name='start_time',
            field=models.TimeField(null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=20, null=True),
        ),
        migrations.RemoveField(
            model_name='business',
            name='service',
        ),
        migrations.AddField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='business.service'),
        ),
        migrations.AddField(
            model_name='business',
            name='service',
            field=models.ManyToManyField(to='business.Service'),
        ),
    ]
