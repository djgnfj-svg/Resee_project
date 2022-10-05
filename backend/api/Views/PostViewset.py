from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg, success_msg
from api.Serializers.PostSerializer import PostsSerializer

from drf_yasg.utils import swagger_auto_schema

from posts.models import ReviewPost

class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def list(self, request, book_id):
		'''
		Get Post_list

		해당 유저의 post_list를 리턴합니다.
		'''
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		serializer = self.get_serializer(queryset, many=True)
		return Response(serializer.data)

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def create(self, request, book_id):
		'''
		Create user post

		해당 유저의 Post를 생성합니다
		'''
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			return Response(self.get_serializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def update(self, request, book_id, pk):
		'''
		Update User Post

		해당 Post를 업데이트 합니다.
		'''
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk), serializer.data)
			return Response(self.get_serializer(rtn).data)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def retrieve(self, request, *args, **kwargs):
		'''
		Detail User post

		해당 POST의 상세정보를 불러옵니다.
		'''
		return super().retrieve(request, *args, **kwargs)

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def destroy(self, request, *args, **kwargs):
		'''
		Delete User post

		해당 Post를 삭제합니다.
		'''
		return super().destroy(request, *args, **kwargs)

	@swagger_auto_schema(tags=["Post에 관련된 로직입니다."], query_serializer=PostsSerializer)
	def partial_update(self, request, *args, **kwargs):
		'''
		Patch User Post

		해당 Post의 일부를 업데이트 합니다.
		'''
		return super().partial_update(request, *args, **kwargs)