from rest_framework import serializers

from books.models import ReviewBook

class PostsSerializer(serializers.ModelSerializer):
	class Meta:
		model = ReviewBook
		fields = ["title", "description"]