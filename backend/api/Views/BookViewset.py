from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Serializers.BookSerializer import BooksSerializer
from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg, success_msg

from drf_yasg.utils import swagger_auto_schema

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")
	@swagger_auto_schema(tags=["Book에 관한 로직입니다."], query_serializer=BooksSerializer)
	def list(self, request):
		'''
		return user book_list

		해당 유저의 book_list를 리턴한다.
		'''
		userid = getUserId(request.user)
		queryset = ReviewBook.objects.filter(user_id = userid)
		if not queryset:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		serializer = BooksSerializer(queryset, many=True)
		return Response(serializer.data)

	@swagger_auto_schema(tags=["Book에 관한 요청입니다."], query_serializer=BooksSerializer)
	def create(self, request):
		serializer = BooksSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status = status.HTTP_400_BAD_REQUEST)
	
	@swagger_auto_schema(tags=["Book에 관한 요청입니다."], query_serializer=BooksSerializer)
	def update(self, request, *args, **kwargs):
		return super().update(request, *args, **kwargs)
	
	@swagger_auto_schema(tags=["Book에 관한 요청입니다."], query_serializer=BooksSerializer)
	def destroy(self, request, *args, **kwargs):
		return super().destroy(request, *args, **kwargs)
	
	@swagger_auto_schema(tags=["Book에 관한 요청입니다."], query_serializer=BooksSerializer)
	def retrieve(self, request, *args, **kwargs):
		return super().retrieve(request, *args, **kwargs)
	
	@swagger_auto_schema(tags=["Book에 관한 요청입니다."], query_serializer=BooksSerializer)
	def partial_update(self, request, *args, **kwargs):
		return super().partial_update(request, *args, **kwargs)