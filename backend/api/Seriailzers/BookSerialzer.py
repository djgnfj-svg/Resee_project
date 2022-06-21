from rest_framework import serializers

from accounts.models import User
from api.Utils.getUser import getUserId
from books.models import ReviewBook

class UserBaseSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ["id", "email", "username"]

		
class BooksSerializer(serializers.ModelSerializer):
	# user = UserBaseSerializer(read_only = True)
	class Meta:
		model = ReviewBook
		fields = ["id", "title", "rough_description"]
		

class BooksCreateSerializer(serializers.Serializer):
	title = serializers.CharField(max_length=20)
	rough_description = serializers.CharField(max_length=40)

	def create(self, request, validated_data):
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)
		
		instance = ReviewBook.objects.create(
			title = validated_data["title"],
			rough_description = validated_data["rough_description"],
			user = User.objects.get(id = userid)
		)
		instance.save()
		return instance
	