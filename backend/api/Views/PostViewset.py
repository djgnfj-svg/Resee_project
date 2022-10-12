from django.utils.decorators import method_decorator

from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg, success_msg
from api.Utils.decorator_utils import default_restful_func
from api.Serializers.PostSerializer import PostsSerializer

from drf_yasg.utils import swagger_auto_schema

from posts.models import ReviewPost
tags = ["POST에 관한 API입니다."]
@method_decorator(name='list', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 유저의 post_list를 리턴합니다.',operation_summary="Get Post_list"))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 유저의 Post를 생성합니다.',operation_summary="Create user post"))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 Post를 업데이트 합니다.',operation_summary="Update User Post"))
@method_decorator(name='destroy',decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 Post를 삭제합니다.',operation_summary="Delete User post"))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 POST의 상세정보를 불러옵니다.', operation_summary="Detail User post"))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=tags, \
	operation_description='해당 Post의 일부를 업데이트 합니다.',operation_summary="Patch User Post"))
class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")

	def list(self, request, book_id):
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	def create(self, request, book_id):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			return Response(self.get_serializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

	def update(self, request, book_id, pk):
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk), serializer.data)
			return Response(self.get_serializer(rtn).data)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)