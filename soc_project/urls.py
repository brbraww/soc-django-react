"""soc_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from soc.views import (
    local_posts_list_view,
    local_posts_detail_view,
    local_posts_profile_view
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', local_posts_list_view),
    path('<int:post_id>', local_posts_detail_view),
    path('profile/<str:username>', local_posts_profile_view),
    path('react/', TemplateView.as_view(template_name='react/react_via_dj.html')),
    path('api/posts/', include('soc.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)