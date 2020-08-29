from django.urls import path

from .views import (
    profile_detail_api_view,
    user_follow_view
)


'''
ClIENT
Base ENDPOINT /api/profiles/
'''

urlpatterns = [
    path('<str:username>/', profile_detail_api_view),
    path('<str:username>/follow', user_follow_view),
]
