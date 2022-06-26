from django.utils import timezone

from rest_framework import viewsets, status
from rest_framework.response import Response

from accounts.models import UserVerification
class VerificationView(viewsets.ViewSet):
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
