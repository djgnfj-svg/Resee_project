from django.http import HttpResponseRedirect
from django.shortcuts import redirect

from rest_framework.views import APIView

from dj_rest_auth.registration.serializers import RegisterSerializer

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC

from Resee.settings import BASE_FRONTEND_URL

from accounts.models import User
class ConfirmEmailView(APIView):
    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario
        user = User.objects.get(email = self.object.email_address)
        user.verified = True
        user.save()
        print("나니?")
        return redirect(BASE_FRONTEND_URL) # 인증성공

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/') # 인증실패
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs

class CustomRegisterSerializer(RegisterSerializer):
    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
		# send_verification_mail(request, user, user.email)
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
        }