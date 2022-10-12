from django.utils import timezone

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from accounts.models import UserVerification, User

from drf_yasg.utils import swagger_auto_schema

class EmailcheckView(viewsets.ViewSet):
	permission_classes  = [AllowAny]
	@swagger_auto_schema(tags=["Email Check에 관한 API입니다."],
	operation_description='email_check에 관한 로직입니다.',
	operation_summary='email_check')
	def create(self, request):
		try :
			User.objects.get(email=request.data['email'])
		except User.DoesNotExist:
			return Response({"msg" : "가입가능"})
		return Response({"msg" : "이미 있는유저"}, status=status.HTTP_402_PAYMENT_REQUIRED)
	# action을 통해서 username체크도 만들자? <- 나중에 중복이 가능하게 할꺼니 필요없다

class VerificationView(viewsets.ViewSet):
	#dj-auth-rest에 있음 나중에 읽고 추가하기
	def list(self, request):
		key = request.GET.get('key','')
		if key == None:
			return Response({"msg" : "이곳은 인증채널입니다."})
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
			return Response({"msg" : msg})
		else:
			msg = "인증에 실패하셨습니다."
			return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)
