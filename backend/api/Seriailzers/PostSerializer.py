from django.shortcuts import get_object_or_404
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
	description = serializers.CharField(max_length=500)

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


	def update(self, pk, validated_data):
		instance = get_object_or_404(ReviewPost, id=pk)
		instance.title=validated_data["title"]
		instance.description=validated_data["description"]
		instance.save()
		return instance
	
	