from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg
from api.Serializers.PostSerializer import PostsSerializer

from posts.models import ReviewPost

class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")

	def list(self, request, book_id):
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response(error_msg(1), status=status.HTTP_404_NOT_FOUND)
		serializer = PostsSerializer(queryset, many=True)
		return Response(serializer.data)

	def create(self, request, book_id):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

	def update(self, request, book_id, pk):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk), serializer.data)
			return Response(PostsSerializer(rtn).data)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)
