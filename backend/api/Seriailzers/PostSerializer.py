from rest_framework import serializers

from accounts.models import User
from api.Utils.getUser import getUserId
from books.models import ReviewBook, ReviewPost

class PostsSerializer(serializers.ModelSerializer):
	review_count = serializers.IntegerField(read_only = True, default = 0)
	created_at = serializers.DateTimeField(format="%Y-%m-%d")
	class Meta:
		model = ReviewPost
		fields = ["id", "title", "description", "review_count", "created_at"]

class PostsCreateSerializer(serializers.Serializer):
	title = serializers.CharField(max_length=20)
	description = serializers.CharField(max_length=100)

	def create(self, request, book_id, validated_data):
		userid = getUserId(request.user)
		instance = ReviewPost.objects.create(
			title = validated_data["title"],
			description = validated_data["description"],
			user = User.objects.get(id = userid),
			Book = ReviewBook.objects.get(id = book_id)
		)
		instance.save()
		return instance