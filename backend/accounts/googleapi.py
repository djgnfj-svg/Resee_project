from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import redirect
from django.conf import settings

from .utils import social_user_get_or_create
from .services import google_get_access_token, google_get_user_info


BASE_URL = 'http://127.0.0.1:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'api/oauth/google/callback'

class GoogleLoginApi(APIView):
    def get(self, request, *args, **kwargs):
        client_id = settings.SOCIAL_AUTH_GOOGLE_CLIENT_ID
        scope = "https://www.googleapis.com/auth/userinfo.email " + \
                "https://www.googleapis.com/auth/userinfo.profile"
        
        redirect_uri = GOOGLE_CALLBACK_URI
        google_auth_api = "https://accounts.google.com/o/oauth2/v2/auth"
        
        response = redirect(
            f"{google_auth_api}?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope={scope}"
        )
        
        return response


class GoogleSigninCallBackApi(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        google_token_api = "https://oauth2.googleapis.com/token"
        
        access_token = google_get_access_token(google_token_api, code)
        user_data = google_get_user_info(access_token=access_token)

        response = social_user_get_or_create(user_data['email'], user_data.get('name', ''),)

        # response = redirect(settings.BASE_FRONTEND_URL)
        
        print(type(response))
        print(response)
        return Response(response)