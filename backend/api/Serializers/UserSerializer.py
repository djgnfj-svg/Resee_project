from dj_rest_auth.registration.serializers import RegisterSerializer
# from api.Utils.email_utils import send_verification_mail

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