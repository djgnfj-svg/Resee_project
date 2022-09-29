from rest_framework import exceptions

from accounts.models import User
from api.Utils.error_massge import error_msg

def getUserId(email):
	try:
		user = User.objects.get(email = email)
	except :
		raise exceptions.AuthenticationFailed(error_msg(403), code=403)
	return user.id