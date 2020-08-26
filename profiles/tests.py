from django.test import TestCase


from django.contrib.auth import get_user_model
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
