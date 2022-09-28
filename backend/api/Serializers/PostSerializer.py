from rest_framework import serializers

from api.Utils.getUser import getUserId
from api.Utils.models_utils import set_imgdata

from accounts.models import User
from posts.models import ReviewPost
from books.models import ReviewBook

class PostsSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length=20)
	description = serializers.CharField(max_length=1000)
	image_ids = serializers.ListField(max_length=100, allow_null = True, required=False)
	review_count = serializers.IntegerField(read_only = True, default = 0)
	created_at = serializers.DateTimeField(read_only=True, format="%Y-%m-%d")

	class Meta:
		model = ReviewPost
		fields = ["id", "title", "description", "review_count", 'image_ids', 'created_at']

	def create(self, request, book_id, validated_data):
		userid = getUserId(request.user)
		instance = ReviewPost.objects.create(
				title = validated_data["title"],
				description = validated_data["description"],
				user = User.objects.get(id = userid),
				Book = ReviewBook.objects.get(id = book_id),
		)
		if validated_data['image_ids']:
			image_ids = list(filter(None,validated_data['image_ids']))
			instance.image_ids = image_ids
			set_imgdata(image_ids, instance.id)
		return instance

	def update(self, instance, validated_data):
		instance.update(
				title = validated_data["title"],
				description = validated_data["description"],
		)
		if validated_data['image_ids']:
			image_ids = list(filter(None,validated_data['image_ids']))
			instance.image_ids = image_ids
			set_imgdata(image_ids, instance.id)
			# delete_imgdata(image_ids, instance.id)
		return instance


