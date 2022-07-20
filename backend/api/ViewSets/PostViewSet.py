from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.Utils.getUser import getUserId
from api.Seriailzers.PostSerializer import PostsSerializer
from api.Seriailzers.PostSerializer import PostImageSerializer
from books.models import ReviewPostImgs
from books.models import ReviewPost

class PostImgViewSet(viewsets.ModelViewSet):
	serializer_class = PostImageSerializer
	queryset = ReviewPostImgs.objects.filter().order_by("created_at")

	def list(self, request, post_id):
		queryset = ReviewPostImgs.objects.filter(post_id = post_id).order_by("created_at")
		test = ReviewPostImgs.objects.filter(post_id = post_id).first()
		if not queryset:
			return Response({"msg" : "Post가 없습니다."}, status=status.HTTP_200_OK)
		serializer = PostImageSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request, post_id):
		serializer = PostImageSerializer(data=request.data, context={'request' : request})
		print(request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response({"msg" : serializer.errors}, status=status.HTTP_402_PAYMENT_REQUIRED)



class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostsSerializer
	queryset = ReviewPost.objects.filter().order_by("created_at")

	def create(self, request, book_id,):
		serializer = PostsSerializer(data=request.data)
		print(request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, book_id, serializer.data)
			if rtn:
				return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : serializer.errors}, status=status.HTTP_402_PAYMENT_REQUIRED)

	def update(self, request, book_id, pk,*args, **kwargs):
		serializer = PostsSerializer(data=request.data)

		if serializer.is_valid():
			rtn = serializer.update(ReviewPost.objects.get(id=pk),serializer.data)
			if rtn:
				return Response(PostsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : serializer.errors}, status=status.HTTP_402_PAYMENT_REQUIRED)
