
from rest_framework.response import Response

Error_msg ={
	1 : "Post가 없습니다.",
	2 : "books가 없습니다.",
}

def error_msg(error_code : int = 0, serializer = None,):
	if serializer is not None:
		return {'error_msg' : serializer.errors}
	else :
		msg = Error_msg[error_code]
		return {"error_msg" : msg}