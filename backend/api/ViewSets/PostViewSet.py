from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg
from api.Seriailzers.PostSerializer import PostsSerializer, PostImageSerializer

from books.models import ReviewPostImgs, ReviewPost

class PostImgViewSet(viewsets.ModelViewSet):
	serializer_class = PostImageSerializer
	queryset = ReviewPostImgs.objects.filter().order_by("created_at")

	def list(self, request, post_id):
		queryset = ReviewPostImgs.objects.filter(post_id = post_id).order_by("created_at")
		if not queryset:
			return Response(error_msg(1), status=status.HTTP_200_OK)
		serializer = PostImageSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request, post_id):
		serializer = PostImageSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(error_msg(serializer=serializer), status=status.HTTP_402_PAYMENT_REQUIRED)


class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")

	def list(self, request, book_id):
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response(error_msg(1), status=status.HTTP_200_OK)
		serializer = PostsSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request, book_id):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			if rtn:
				return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_402_PAYMENT_REQUIRED)

	def update(self, request, book_id, pk):
		serializer = PostsSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk), serializer.data)
			if rtn:
				return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status=status.HTTP_402_PAYMENT_REQUIRED)
