from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.utils.http  import is_safe_url
from django.conf import settings

from .forms import PostForm
from .models import Posts


ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


def post_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    :return json data
    """
    qs = Posts.objects.all()
    posts_list = [x.serialize() for x in qs]
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
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 == created items
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = PostForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={'form': form})
