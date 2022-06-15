from rest_framework import serializers

from accounts.models import User

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)
	password = serializers.CharField(max_length=30)

class UserSignUpSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)
	username = serializers.CharField(max_length=30)
	password = serializers.CharField(max_length=30)

class UserCreateSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)
	username = serializers.CharField(max_length=30)
	password = serializers.CharField(max_length=30)

	def create(self, validated_data):
		instance = User.objects.create(
			email = validated_data['email'],
			username = validated_data['username'],
		)
		instance.set_password(validated_data['password'])
		instance.save()
		return instance