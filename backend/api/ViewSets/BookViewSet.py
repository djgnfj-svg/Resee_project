from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response

from api.Seriailzers.BookSerialzer import BooksSerializer, BooksCreateSerializer

from api.Utils.getUser import getUserId

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")
	def list(self, request, *args, **kwargs):
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)

		queryset = ReviewBook.objects.filter(user_id = userid)
		if not queryset:
			return Response({"msg" : "books가 없습니다."}, status=status.HTTP_200_OK)
		serializer = BooksSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		serializer = BooksCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : "데이터 잘못됨"}, status=status.HTTP_200_OK)
		
	def retrieve(self, request, pk, *args, **kwargs):
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)
		temp = ReviewBook.objects.get(id=pk).user_id
		if temp != userid:
			raise exceptions.PermissionDenied({"msg" : "권한없음"}, code=status.HTTP_403_FORBIDDEN)
		return super().retrieve(request, *args, **kwargs)
	
	def destroy(self, request, pk, *args, **kwargs):
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)
		temp = ReviewBook.objects.get(id=pk).user_id
		if temp != userid:
			raise exceptions.PermissionDenied({"msg" : "권한없음"}, code=status.HTTP_403_FORBIDDEN)
		return super().destroy(request, *args, **kwargs)
