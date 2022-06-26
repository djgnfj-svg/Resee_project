import requests

from django.conf import settings
from django.urls import path, include

from accounts.googleapi import GoogleLoginApi, GoogleSigninCallBackApi


login_patterns = [
    path('google/login',GoogleLoginApi.as_view(), name='google_login'),
    path('google/callback',GoogleSigninCallBackApi.as_view(), name='google_callback'),
]
