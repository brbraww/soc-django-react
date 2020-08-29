from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializers import PublicProfileSerializer, PublicProfileDetailSerializer
from ..models import Profile

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['GET'])
def profile_detail_api_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({'detail': 'User not found.'}, status=404)
    profile_obj = qs.first()
    data = PublicProfileDetailSerializer(instance=profile_obj, context={'request': request})
    return Response(data.data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    user = request.user
    other_user_qs = User.objects.filter(username=username)

    if user.username == username:
        current_followers = user.profile.followers.all()
        return Response({'followers_count': current_followers.count()}, status=200)

    if not other_user_qs.exists():
        return Response({}, status=404)

    other = other_user_qs.first()
    profile = other.profile
    data = request.data or {}
    action = data.get('action')

    if action == 'follow':
        profile.followers.add(user)
    elif action == 'unfollow':
        profile.followers.remove(user)

    data = PublicProfileDetailSerializer(instance=profile, context={'request': request})

    return Response(data.data, status=200)
