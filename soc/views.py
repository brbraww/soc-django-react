from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Messages


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


def message_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    :return json data
    """
    qs = Messages.objects.all()
    messages_list = [{
        'id': x.id,
        'content': x.content
    } for x in qs]
    data = {
        'response': messages_list
    }
    return JsonResponse(data)


def message_detail_view(request, message_id, *args, **kwargs):
    """
        REST API VIEW
        :return json data
        """
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
