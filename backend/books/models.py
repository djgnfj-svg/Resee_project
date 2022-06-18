from django.db import models

from Resee.settings import AUTH_USER_MODEL as MyUser
# Create your models here.

class ReviewBook(models.Model):
	title = models.CharField(max_length=20, null=False)
	rough_description = models.CharField(max_length=100, null=True)
	user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	# book_cover = models.ImageField(null=True)

class ReviewPost(models.Model):
	title = models.CharField(max_length=20, null=False)
	description = models.TextField(null=True)
	review_count =models.IntegerField(default=0, null=False)

	user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
	Book = models.ForeignKey(ReviewBook, on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)