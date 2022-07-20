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

	# def update(self, title, description, image_ids):
	# 	self.title = title
	# 	self.description = description
	# 	self.image_ids = image_ids
	# 	self.save()
	# 	return self


class ReviewPost(models.Model):
	title = models.CharField(max_length=20, null=False)
	description = models.TextField(null=False)
	review_count =models.IntegerField(default=0, null=False)
	image_ids = models.JSONField(null=True)

	user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
	Book = models.ForeignKey(ReviewBook, on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def review_count_up(self):
		self.review_count += 1
		self.save()

	def update(self, title, description, image_ids):
		self.title = title
		self.description = description
		self.image_ids = image_ids
		self.save()
		return self

class ReviewPostImgs(models.Model):
	title = models.CharField(max_length=20, null=True)
	post = models.ForeignKey(ReviewPost, on_delete=models.CASCADE, null=True)
	image = models.ImageField(blank=True, upload_to='images', null=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)