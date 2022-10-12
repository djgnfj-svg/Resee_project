from django.utils.decorators import method_decorator

from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Serializers.BookSerializer import BooksSerializer
from api.Utils.getUser import getUserId
from api.Utils.error_massge import success_msg
from api.Utils.decorator_utils import default_restful_func

from drf_yasg.utils import swagger_auto_schema

from books.models import ReviewBook
tags = ["Books에 관한 API입니다"]

@method_decorator(name='list', decorator=swagger_auto_schema(tags=tags,\
	operation_description='해당 유저의 book_list를 리턴한다.',operation_summary="return user book_list"))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=tags,\
	operation_description='해당 유저의 book을 만들어 줌니다.',operation_summary="Create user book",))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 유저의 book을 수정해 줌니다.',operation_summary="Update user book"))
@method_decorator(name='destroy',decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 유저의 book을 삭제 합니다.',operation_summary="Delete user book"))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 book의 상세정보를 보여줍니다.', operation_summary="Detail user book"))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 유저의 book의 일부분을 만들어 줌니다.',operation_summary="Patch user book"))
class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")

	def list(self, request):
		userid = getUserId(request.user)
		queryset = ReviewBook.objects.filter(user_id = userid)
		if not queryset:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	@default_restful_func()
	def create(self, request):
		pass
