
from rest_framework.response import Response

ERROR_MSG = {
	403 : "허락 못해",
	404 : "데어터가 없습니다.",

	2001: "이미 가입된유저 입니다.",
	2002 : "신청한적 없는 유저입니다",
	2003 : "마스터는 탈퇴할 수 없습니다.",

	2100 : "가입된 유저가 아님니다.",
	2101 : "매니저가 아닙니다."
}

SUCCESS_MSG = {
	200 : "성공",
	204 : "데이터가 없습니다",
	1001 : "가입성공",
	1002 : "탈퇴성공",
	1003 : "가입 신청 하셨습니다.",
	2002 : "삭제성공",
}

def error_msg(error_code : int = 0, serializer = None,):
	if serializer:
		return {'error_msg' : serializer.errors}
	else :
		msg = ERROR_MSG[error_code]
		return {"error_msg" : msg}


def success_msg(success_code: int = 0):
	msg = SUCCESS_MSG[success_code]
	return {'success_msg' : msg} 