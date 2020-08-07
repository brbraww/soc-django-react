from django.db import models
from django.conf import  settings
from random import randint


User = settings.AUTH_USER_MODEL


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='post_user', blank=True, through=PostLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return str(self.content)

    @property
    def is_repost(self):
        return self.parent != None

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': randint(0, 200)
        }