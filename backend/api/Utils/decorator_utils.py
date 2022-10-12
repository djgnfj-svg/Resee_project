# from django.utils.decorators import method_decorator

# from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response

from api.Utils.error_massge import error_msg
# def white_list_check(func_name):
#     def _dec(obj):
#         if not isinstance(obj, type):
#             print("test")
#         else:
#             temp = getattr(obj, func_name)
#             method_decorator(name=temp.__name__, decorator=swagger_auto_schema(
#             tags=["Book에 관한 로직입니다."]))
            
#         return obj
#         # def wrapper(request, *args, **kwargs):
#             # if func.__name__ not in func_name_list:
#             #     temp
#             # func()
#             # pass
#         # return wrapper
#     return _dec

# 모든 create과 update등을 커스텀할수 는 없을까?
# 실패사유 모든 create은 다르다... 일단 완전 커스텀한 부분만 완성해 두자,..
def default_restful_func():
    def custom_restful_api(func):
        def wrapper(*args, **kwargs):
            request = args[1]
            viewset = args[0]
            func_name = func.__name__
            serializer = viewset.get_serializer(data=request.data)
            if serializer.is_valid():
                if func_name == "create":
                    rtn = serializer.create(args[1], serializer.data)
                    return Response(viewset.get_serializer(rtn).data, status=status.HTTP_201_CREATED)
            else :
                return Response(error_msg(serializer=serializer), status = status.HTTP_400_BAD_REQUEST)
        return wrapper
    return custom_restful_api