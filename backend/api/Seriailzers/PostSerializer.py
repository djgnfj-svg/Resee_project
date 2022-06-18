from rest_framework import serializers

from accounts.models import User
from books.models import ReviewBook, ReviewPost

class PostsSerializer(serializers.ModelSerializer):
	class Meta:
		model = ReviewPost
		fields = ["id", "title", "description", "review_count"]

class PostsCreateSerializer(serializers.Serializer):
	title = serializers.CharField(max_length=20)
	description = serializers.CharField(max_length=100)

	def create(self, request, book_id, validated_data):
		instance = ReviewPost.objects.create(
			title = validated_data["title"],
			description = validated_data["description"],
			user = User.objects.get(id = request.user.id),
			Book = ReviewBook.objects.get(id = book_id)
		)
		instance.save()
		return instance