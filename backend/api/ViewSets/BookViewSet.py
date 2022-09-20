from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Serializers.BookSerializer import BooksSerializer
from api.Utils.getUser import getUserId
from api.Utils.error_massge import error_msg

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")

	def list(self, request):
		userid = getUserId(request.user)
		queryset = ReviewBook.objects.filter(user_id = userid)
		if not queryset:
			return Response(error_msg(2))
		serializer = BooksSerializer(queryset, many=True)
		return Response(serializer.data)

	def create(self, request):
		serializer = BooksSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(serializer=serializer), status = status.HTTP_400_BAD_REQUEST)
