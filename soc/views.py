from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Messages


def home_view(request, *args, **kwargs):
    return HttpResponse('<h1>Hello world</h1>')


def message_detail_view(request, message_id, *args, **kwargs):
    data = {
        'id': message_id,
    }
    status = 200
    try:
        obj = Messages.objects.get(id=message_id)
        data['content'] = obj.content
        data['message'] = '1'
    except:
        data['message'] = '0'
        status = 404

    return JsonResponse(data, status=status)
