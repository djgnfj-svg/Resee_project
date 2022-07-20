from rest_framework import serializers

from api.Utils.getUser import getUserId

from accounts.models import User

from books.models import ReviewBook

class BooksSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length=20)
	rough_description = serializers.CharField(max_length=40)

	class Meta:
		model = ReviewBook
		fields = ["id", "title", "rough_description"]

	def create(self, request, validated_data):
		userid = getUserId(request.user)
		instance = ReviewBook.objects.create(
			title = validated_data["title"],
			rough_description = validated_data["rough_description"],
			user = User.objects.get(id = userid)
		)
		instance.save()
		return instance
