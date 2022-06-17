from rest_framework import exceptions

from accounts.models import User

def getUserId(username):
	try:
		user = User.objects.get(username = username)
	except :
		raise exceptions.AuthenticationFailed({"msg" : "프론트에게 Authorization를 달라고하자"}, code=401)

	return user.id