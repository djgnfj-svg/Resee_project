from django.db import models

from Resee.settings import AUTH_USER_MODEL as MyUser
# Create your models here.

class ReviewBook(models.Model):
	title = models.CharField(max_length=20, null=False)
	rough_description = models.CharField(max_length=100, null=True, blank=True)
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