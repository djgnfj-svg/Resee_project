from rest_framework import viewsets, status
from rest_framework.response import Response


from api.Seriailzers.BookSerialzer import BooksSerializer, BooksCreateSerializer
from api.Utils.getUser import getUserId
from accounts.models import User

from books.models import ReviewBook

class BooksViewSet(viewsets.ModelViewSet):
	serializer_class = BooksSerializer
	def list(self, request, *args, **kwargs):
		# token으로 유저를 식별 -> 식별 -> 맞는유저검색
			# token을 이용해서 request.user를 검색해야한다.
			# 만약 request.user.id가 검색이 된다면
			# 그걸로 진행
		# request.is_authenticated: -> 식별 -> 맞는 유저검색
			# 아래와 같은이유
		# request.user.id 로 식별 <- 식별하자마자 data get가능
			# 그럴려면 login을 진행해서 sessionid를 만들어야함
			# 그게 싫다 왜냐하면 하나이상으로 로그인했단 증거를 만들기 ㄴ
			# 그리고 3000에서 8000으로 보냈기때문에
			# 8000에 로그인이 되어있어야 한다
			# 힘들다 이말이지

		try :
			#둘중 하나
			userid = getUserId(request.user)
			queryset = ReviewBook.objects.filter(user_id = userid)
			
			# queryset = ReviewBook.objects.filter(user_id = request.user.id)
		except :
			return Response({"msg" : "books가 없습니다."}, status=status.HTTP_200_OK)
		serializer = BooksSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	#todo OAuth로 나중에
	def create(self, request, *args, **kwargs):
		# userid = getUserId(request.user)
		serializer = BooksCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(BooksSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : "이곳은 books post입니다."}, status=status.HTTP_200_OK)