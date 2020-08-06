from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Post


User = get_user_model()


class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='aaaa', password='password')
        self.user123 = User.objects.create_user(username='aaaa321', password='password')
        Post.objects.create(content='test content 111', user=self.user)
        Post.objects.create(content='222 test content 222', user=self.user)
        Post.objects.create(content='333 test content 333', user=self.user123)
        self.currentCount = Post.objects.all().count()

    def test_user_created(self):
        user = User.objects.get(username='aaaa')
        self.assertEqual(user.username, 'aaaa')

    def test_post_created(self):
        post_obj = Post.objects.create(content='44444444444', user=self.user)
        self.assertEqual(post_obj.id, self.currentCount + 1)
        self.assertEqual(post_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client

    def test_post_list(self):
        client = self.get_client()
        response = client.get('/api/posts/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), self.currentCount)

    def test_action_like(self):
        client = self.get_client()
        for i in range(10):
            response = client.post('/api/posts/action', {'post_id': 1, 'action':'like'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json()), self.currentCount+1)
            self.assertEqual(response.json().get('likes'), 1)

    def test_action_unlike(self):
        client = self.get_client()
        for i in range(10):
            response = client.post('/api/posts/action', {'post_id': 1, 'action': 'unlike'})
            another_response = client.post('/api/posts/action', {'post_id': 2, 'action': 'unlike'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json().get('likes'), 0)
            self.assertEqual(len(response.json()), self.currentCount+1)
            self.assertEqual(another_response.json().get('likes'), 0)

    def test_action_repost(self):
        client = self.get_client()
        response = client.post('/api/posts/action', {'post_id': 3, 'action': 'repost'})
        data = response.json()
        new_post_id = data.get('id')
        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(3, new_post_id)

    def test_post_create(self):
        data = {'content': 'test'}
        client = self.get_client()
        response = client.post('/api/posts/create', data)
        new_post_id = response.json().get('id')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(new_post_id, self.currentCount+1)

    def test_post_detail(self):
        client = self.get_client()
        response = client.get('/api/posts/1')
        data = response.json()
        _id = data.get('id')
        self.assertEqual(_id, 1)
        self.assertEqual(response.status_code, 200)

    def test_post_delete(self):
        client = self.get_client()
        response = client.delete('/api/posts/1/delete')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('message'), 'post removed')
        response = client.delete('/api/posts/1/delete')
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete('/api/posts/3/delete')
        self.assertEqual(response_incorrect_owner.status_code, 401)