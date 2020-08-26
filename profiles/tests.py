from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient

from .models import Profile


User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='aaaa',
            password='password'
        )
        self.user123 = User.objects.create_user(
            username='aaaa321',
            password='password'
        )

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.user123
        first.profile.followers.add(second)                     # added a follower
        qs = second.following.filter(user=first)
        first_user_following_no_one = first.following.all()
        self.assertTrue(qs.exists())                            # second user following first
        self.assertFalse(first_user_following_no_one.exists())  # first user no following

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(
            f'/api/profiles/{self.user123.username}/follow',
            {"action": "follow"}
        )
        r_data = response.json()
        count = r_data.get("followers_count")
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        first = self.user
        second = self.user123
        first.profile.followers.add(second)

        client = self.get_client()
        response = client.post(
            f'/api/profiles/{self.user123.username}/follow',
            {"action": "unfollow"}
        )
        r_data = response.json()
        count = r_data.get("followers_count")
        self.assertEqual(count, 0)
