from Resee.settings import AUTH_USER_MODEL as MyUser
from django.db import models

from books.models import ReviewBook

# Create your models here.
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

	def update(self, title=None, description=None, image_ids=None):
		if title :
			self.title = title
		if description:
			self.description = description
		if image_ids:
			old_ids = self.image_ids
			self.image_ids = image_ids
			# old_img에서 new에 해당하지 않는 것을 모두 삭제해준다,.
			ReviewPostImgs.objects.filter(id__in = old_ids).exclude(id__in = self.image_ids).delete()
		self.save()
		return self

class ReviewPostImgs(models.Model):
	title = models.CharField(max_length=20, null=True)
	post = models.ForeignKey(ReviewPost, on_delete=models.CASCADE, null=True)
	image = models.ImageField(blank=True, upload_to='images', null=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)