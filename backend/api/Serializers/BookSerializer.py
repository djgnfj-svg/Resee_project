from email.policy import default
from rest_framework import serializers

from accounts.models import User

from books.models import ReviewBook

class BooksSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length=20)
	rough_description = serializers.CharField(max_length=40, required=False, allow_blank=True)

	class Meta:
		model = ReviewBook
		fields = ["id", "title", "rough_description"]

	def create(self, request, validated_data):
			
		instance = ReviewBook.objects.create(
			title = validated_data["title"],
			user = User.objects.get(id = request.user.id)
		)
		if validated_data["rough_description"]:
			instance.rough_description = validated_data["rough_description"]
		instance.save()
		return instance
