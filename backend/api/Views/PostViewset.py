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
	@swagger_auto_schema(tags=["Post입니다."])
	def list(self, request, book_id):
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		serializer = PostsSerializer(queryset, many=True)
		return Response(serializer.data)
	@swagger_auto_schema(tags=["Post입니다."])
	def create(self, request, book_id):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)
	@swagger_auto_schema(tags=["Post입니다."])
	def update(self, request, book_id, pk):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk), serializer.data)
			return Response(PostsSerializer(rtn).data)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)
	@swagger_auto_schema(tags=["Post입니다."])
	def retrieve(self, request, *args, **kwargs):
		return super().retrieve(request, *args, **kwargs)
	@swagger_auto_schema(tags=["Post입니다."])
	def destroy(self, request, *args, **kwargs):
		return super().destroy(request, *args, **kwargs)
	@swagger_auto_schema(tags=["Post입니다."])
	def partial_update(self, request, *args, **kwargs):
		return super().partial_update(request, *args, **kwargs)