from django.http import JsonResponse
from django.shortcuts import render
from random import randint

from .forms import PostForm
from .models import Posts


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


def post_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    :return json data
    """
    qs = Posts.objects.all()
    posts_list = [{
        'id': x.id,
        'content': x.content,
        'likes': randint(0, 20)
    } for x in qs]
    data = {
        'isUser': False,
        'response': posts_list
    }
    return JsonResponse(data)


def post_detail_view(request, post_id, *args, **kwargs):
    """
        REST API VIEW
        :return json data
        """
    data = {
        'id': post_id,
    }
    status = 200
    try:
        obj = Posts.objects.get(id=post_id)
        data['content'] = obj.content
        data['post'] = '1'
    except:
        data['post'] = '0'
        status = 404

    return JsonResponse(data, status=status)


def post_create_view(request, *args, **kwargs):
    form = PostForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        form = PostForm()
    return render(request, 'components/forms.html', context={'form': form})
