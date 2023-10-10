from django.db import models

class News(models.Model):
    news_type = models.CharField(max_length=250)
    url = models.CharField(max_length=1000)
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to="", blank=True)

    def __str__(self) -> str:
        return self.title