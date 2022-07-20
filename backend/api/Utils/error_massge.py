
from rest_framework.response import Response

error_msg ={
	1 : "Post가 없습니다.",
	2 : "books가 없습니다.",
}

def error_msg(error_code : int = 0, serializer = None,):
	if serializer is not None:
		return {'error_msg' : serializer.errors}
	else :
		return {"error_msg" : error_msg[1]}