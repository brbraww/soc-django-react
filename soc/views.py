from django.shortcuts import render


def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, 'pages/home.html', context={'username': username}, status=200)


def feed_view(request, *args, **kwargs):
    return render(request, 'pages/feed.html')


def posts_list_view(request, *args, **kwargs):
    return render(request, 'posts/list.html')


def posts_detail_view(request, post_id, *args, **kwargs):
    return render(request, 'posts/detail.html', context={'post_id': post_id})


def posts_profile_view(request, username, *args, **kwargs):
    return render(request, 'posts/profile.html', context={'profile_username': username}, status=200)

