from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth import login, logout

from api.Seriailzers.UserSerialzer import UserLoginSerializer, UserCreateSerializer,UserSignUpSerializer

from accounts.models import User
from api.Utils.email_utils import send_verification_mail

class UserLoginViewSet(viewsets.ModelViewSet):
	serializer_class = UserLoginSerializer
	def list(self, request, *args, **kwargs):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)
	
	#todo OAuth로 나중에
	def create(self, request, *args, **kwargs):
		user = User.objects.get(email=request.data['email'])
		token = Token.objects.get(user=user)
		login(request,user)
		print("로그인 하셨습니다")
		request.session['user'] = user.id
		print(request.session.get("user"))
		return Response({'Token' : token.key}, status=201)


class UserLogoutViewSet(viewsets.ViewSet):
	def list(self, request):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)

	def create(self, request):
		user =User.objects.get(id=request.user.id)
		logout(user)
		del(request.session['user'])
		return Response({"msg" : "로그아웃성공"}, status=status.HTTP_200_OK)

class UserSignUpViewSet(viewsets.ModelViewSet):
	serializer_class = UserSignUpSerializer
	def list(self, request, *args, **kwargs):
		return Response({"msg" : "test"}, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		serializer = UserCreateSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True):
			user = serializer.save() # DB 저장
			# send_verification_mail(request, user, user.email)
			# login(request, user)
			token = Token.objects.create(user=user)
			return Response({'Token' : token.key}, status=201)
		return Response({"msg" : "실패"}, status=status.HTTP_400_BAD_REQUEST)