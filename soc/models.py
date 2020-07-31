from django.db import models
from random import randint

class Posts(models.Model):
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': randint(0, 200)
        }