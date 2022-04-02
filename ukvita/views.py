from django.shortcuts import render, redirect
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponse
from django.core.mail import send_mail
import requests
import json
from . import settings
from django.contrib.auth.models import User
from .models import *
from django.utils import timezone
from qsstats import QuerySetStats


# Пользовательская функция, а не просмотр
def change_info(request):       # Модифицировать информацию, такую ​​как посещаемость сайта и IP
    # Для каждого посещения добавьте 1 к общему количеству посещений.
    count_nums = VisitNumber.objects.filter(id=1)
    if count_nums:
        count_nums = count_nums[0]
        count_nums.count += 1
    else:
        count_nums = VisitNumber()
        count_nums.count = 1
    count_nums.save()

    # Запишите количество посещений ip и каждого ip
    if 'HTTP_X_FORWARDED_FOR' in request.META:  # Получить IP
        client_ip = request.META['HTTP_X_FORWARDED_FOR']
        client_ip = client_ip.split(",")[0]  # Так вот настоящий айпи
    else:
        client_ip = request.META['REMOTE_ADDR']  # Получить IP прокси здесь
    # print(client_ip)

    ip_exist = Userip.objects.filter(ip=str(client_ip))
    if ip_exist:  # Определить, существует ли ip
        uobj = ip_exist[0]
        uobj.count += 1
    else:
        uobj = Userip()
        uobj.ip = client_ip
        uobj.count = 1
    uobj.save()

    # Увеличение сегодняшних посещений
    date = timezone.now().date()
    today = DayNumber.objects.filter(day=date)
    if today:
        temp = today[0]
        temp.count += 1
    else:
        temp = DayNumber()
        temp.dayTime = date
        temp.count = 1
    temp.save()


def autocomplete(request):
    if request.user.is_authenticated:
        context = {
            'nickname': request.user.username
        }
        return context
    else:
        pass


def index(request):
    change_info(request)
    new = News.objects.order_by('-id')
    if request.user.is_authenticated:
        context = {
            'nickname': request.user.username,
            'news': new
        }
        return render(request, 'index.html', context)
    context = {
        'news': new
    }
    return render(request, 'index.html', context)


def news(request):
    change_info(request)
    return render(request, 'news.html', autocomplete(request))


def dashboard(request):
    if request.method == 'POST' :
        if 'dashboard' in request.get_full_path_info() and 'header' in request.POST:
            News.objects.create(header=request.POST['header'], subtitle=request.POST['subtitle'], text=request.POST['message'])
            response = []
            response.append({"alert_all": "success_news"})
            return HttpResponse(json.dumps(response), content_type="application/json")
        elif 'dashboard' in request.get_full_path_info() and 'method' in request.POST and request.POST['method'] == 'delete':
            response = [{'status': 'True'}]
            SendHelp.objects.filter(id=request.POST['id']).delete()
            return HttpResponse(json.dumps(response), content_type="application/json")
    elif request.method == 'GET':
        if 'dashboard' in request.get_full_path_info() and 'input' in request.GET:
            response = []
            HelpUser = SendHelp.objects.order_by('id')
            for i in HelpUser:
                response.append({
                    'id': i.id,
                    'last_name': i.last_name,
                    'first_name': i.first_name,
                    'address': i.address,
                    'message': i.message
                })
            return HttpResponse(json.dumps(response), content_type="application/json")
        elif 'dashboard' in request.get_full_path_info() and 'stats' in request.GET:
            response, DaysStats, CountStats = []
            for i in DayNumber.objects.order_by('id'):
                DaysStats.append(str(str(i.day.day) + '.' + str(i.day.month) + '.' + str(i.day.year))),
                CountStats.append(str(i.count)),
            response.append({'0': DaysStats, '1': CountStats})
            return HttpResponse(json.dumps(response), content_type="application/json")
    return render(request, 'dashboard.html', autocomplete(request))


def feedback(request):
    if request.method == 'POST':
        print(request.POST)
        if 'last_name' in request.POST and 'first_name' in request.POST and 'address' in request.POST and 'message' in request.POST:
            SendHelp.objects.create(
                last_name=request.POST['last_name'],
                first_name=request.POST['first_name'],
                address=request.POST['address'],
                message=request.POST['message']
            )
            response = [{"alert_all": "success_feedback"}]
            return render(request, 'feedback.html', autocomplete(request))
    return render(request, 'feedback.html', autocomplete(request))


def Login(request):
    change_info(request)
    if request.user.is_authenticated:
        return redirect('/')
    else:
        login = request.POST['login']
        passwords = request.POST['password']


def LogoutView(request):
    change_info(request)
    logout(request)
    return redirect('/')


def AdminPanel(request):
    change_info(request)
    return render(request, 'index.html')