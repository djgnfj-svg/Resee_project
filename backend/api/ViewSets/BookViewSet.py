from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Seriailzers.BookSerialzer import BooksSerializer, BooksCreateSerializer

from api.Utils.getUser import getUserId

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")
	def list(self, request, *args, **kwargs):
		userid = getUserId(request.user)
		queryset = ReviewBook.objects.filter(user_id = userid)
		serializer = BooksSerializer(queryset, many=True)
		if not serializer.data:
			return Response({"msg" : "books가 없습니다."}, status=status.HTTP_200_OK)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		# userid = getUserId(request.user)
		serializer = BooksCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : "데이터 잘못됨"}, status=status.HTTP_200_OK)
		
	def retrieve(self, request, *args, **kwargs):
		return super().retrieve(request, *args, **kwargs)
	
	def destroy(self, request, *args, **kwargs):
		return super().destroy(request, *args, **kwargs)
