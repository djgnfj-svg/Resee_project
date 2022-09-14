import email
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from accounts.models import UserVerification, User

class EmailcheckView(viewsets.ViewSet):
	permission_classes  = [AllowAny]
	def create(self, request):
		try :
			user = User.objects.get(email=request.data['email'])
		except User.DoesNotExist:
			return Response({"msg" : "가입가능"}, status=status.HTTP_200_OK)
		return Response({"msg" : "이미 있는유저"}, status=status.HTTP_402_PAYMENT_REQUIRED)

class VerificationView(viewsets.ViewSet):
	#dj-auth-rest에 있음 나중에 읽고 추가하기
	def list(self, request):
		key = request.GET.get('key','')
		if key == None:
			return Response({"msg" : "이곳은 인증채널입니다."}, status=status.HTTP_200_OK)
		verification = UserVerification.objects.get(key=key)
		current = timezone.now()
		if verification.expired_at > current:
			verification.verified = True
			verification.verified_at = current
			verification.save()

			user = verification.user 
			user.verified = True
			user.save()
			msg = "인증에 성공하셨습니다."
			return Response({"msg" : msg}, status=status.HTTP_200_OK)
		else:
			msg = "인증에 실패하셨습니다."
			return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)
