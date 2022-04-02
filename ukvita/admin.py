from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import *


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user',)


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('header', 'subtitle', 'text', 'day',)


@admin.register(Userip)
class UseripAdmin(admin.ModelAdmin):
    list_display = ('id', 'ip', 'count',)


@admin.register(VisitNumber)
class VisitNumberAdmin(admin.ModelAdmin):
    list_display = ('count',)


@admin.register(DayNumber)
class DayNumberAdmin(admin.ModelAdmin):
    list_display = ('day', 'count',)


@admin.register(SendHelp)
class SendHelpAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'address', 'message', 'day',)