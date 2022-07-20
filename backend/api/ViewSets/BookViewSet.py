from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response

from api.Seriailzers.BookSerialzer import BooksSerializer

from api.Utils.getUser import getUserId

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	queryset = ReviewBook.objects.filter().order_by("created_at")

	def create(self, request, *args, **kwargs):
		serializer = BooksSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : serializer.errors}, status=status.HTTP_200_OK)