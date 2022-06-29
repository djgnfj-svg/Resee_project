from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response


from api.Utils.getUser import getUserId
from api.Seriailzers.PostSerializer import PostsSerializer, PostsCreateSerializer
from books.models import ReviewPost

class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")
	def list(self, request, book_id):
		userid = getUserId(request.user)
		queryset = ReviewPost.objects.filter(user_id = userid, Book_id = book_id)
		if not queryset:
			return Response({"msg" : "Post가 없습니다."}, status=status.HTTP_200_OK)
		serializer = PostsSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request, book_id, *args, **kwargs):
		serializer = PostsCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			if rtn:
				return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : "데이터 잘못됨"}, status=status.HTTP_200_OK)

	def retrieve(self, request, book_id, pk, *args, **kwargs):
		userid = getUserId(request.user)
		temp = get_object_or_404(ReviewPost, id=pk).user_id
		if temp != userid:
			raise exceptions.PermissionDenied({"msg" : "권한없음"}, code=status.HTTP_403_FORBIDDEN)
		return super().retrieve(request, *args, **kwargs)

	def destroy(self, request, book_id, pk, *args, **kwargs):
		userid = getUserId(request.user)
		temp = get_object_or_404(ReviewPost, id=pk).user_id
		if temp != userid:
			raise exceptions.PermissionDenied({"msg" : "권한없음"}, code=status.HTTP_403_FORBIDDEN)
		return super().destroy(request, *args, **kwargs)