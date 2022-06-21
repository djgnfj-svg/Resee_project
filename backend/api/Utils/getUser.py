from rest_framework import exceptions

from accounts.models import User

def getUserId(email):
	try:
		user = User.objects.get(email = email)
	except :
		raise exceptions.AuthenticationFailed({"msg" : "프론트에게 Authorization를 달라고하자"}, code=401)
	return user.id