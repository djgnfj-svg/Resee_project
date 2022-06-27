# utils.py

from django.db import transaction
from django.contrib.auth.models import update_last_login

from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User


@transaction.atomic
def social_user_create(email, username, password=None,):
    user = User.objects.create(email = email, username = username)
    
    if password:
        user.set_password(password)
    else:
        user.set_unusable_password()
        
    user.save()
    return user


# @transaction.atomic
def social_user_get_or_create(email, nickname):
    try :
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = social_user_create(email, nickname)
    update_last_login(user)
    token = RefreshToken.for_user(user)
    response = {}
    response['username'] = user.username
    response['access_token'] = str(token.access_token)
    response['refresh_token'] = str(token)
    return response
    
