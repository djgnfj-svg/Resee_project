from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth import login, logout

from api.Seriailzers.UserSerialzer import UserLoginSerializer, UserCreateSerializer,UserSignUpSerializer

from accounts.models import User

class UserLoginViewSet(viewsets.ModelViewSet):
	serializer_class = UserLoginSerializer
	def list(self, request, *args, **kwargs):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)
	
	#todo OAuth로 나중에
	def create(self, request, *args, **kwargs):
		user = User.objects.get(email=request.data['email'])
		token = Token.objects.get(user=user)
		login(request,user)
		print("test")
		return Response({'Token' : token.key}, status=201)
# 버튼 잘만드는법

class UserLogoutViewSet(viewsets.ViewSet):
	def list(self, request):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)

	def create(self, request):
		user =User.objects.get(id=request.user.id)
		logout(user)
		return None

class UserSignUpViewSet(viewsets.ModelViewSet):
	serializer_class = UserSignUpSerializer
	def list(self, request, *args, **kwargs):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		serializer = UserCreateSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True):
			User = serializer.save() # DB 저장
			token = Token.objects.create(user=User)
			return Response({'Token' : token.key}, status=201)
		return Response({"msg" : "실패"}, status=status.HTTP_400_BAD_REQUEST)