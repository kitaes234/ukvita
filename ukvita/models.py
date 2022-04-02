from django.db import models
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.utils import timezone


# IP-адрес и количество посещений сайта
class Userip(models.Model):
    ip=models.CharField(verbose_name='Айпи адрес',max_length=30)    #айпи адрес
    count=models.IntegerField(verbose_name="Визиты",default=0) # Ip посещения

    class Meta:
        verbose_name = "Доступ к информации о пользователе"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.ip


# Всего посещений сайта
class VisitNumber(models.Model):
    count = models.IntegerField(
        verbose_name="Всего посещений сайта",
        default=0
    ) # Всего посещений сайта

    class Meta:
        verbose_name = "Всего посещений сайта"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.count)


# Статистика посещений за один день
class DayNumber(models.Model):
    day=models.DateField(verbose_name='свидание',default=timezone.now)
    count=models.IntegerField(verbose_name='Количество посещений сайта',default=0) # Всего посещений сайта
    class Meta:
        verbose_name = 'Статистика ежедневных посещений сайта'
        verbose_name_plural = verbose_name
    def __str__(self):
        return str(self.day)


class UserProfile(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Пользователь',
    )

    class Meta:
        verbose_name_plural = ("Пользователи")


class News(models.Model):
    header = models.TextField(
        verbose_name='Заголовок'
    )
    subtitle = models.TextField(
        verbose_name='Подзаголовок'
    )
    text = models.TextField(
        verbose_name='Текст'
    )
    day = models.DateField(verbose_name='Дата создания', default=timezone.now)

    class Meta:
        verbose_name_plural = ("Новости")


class SendHelp(models.Model):
    last_name = models.TextField(verbose_name="Имя")
    first_name = models.TextField(verbose_name="Фамилия")
    address = models.TextField(verbose_name="Адрес")
    message = models.TextField(verbose_name="Обращение")
    day = models.DateField(verbose_name='Дата обращения', default=timezone.now)

    class Meta:
        verbose_name_plural = ("Обращения")