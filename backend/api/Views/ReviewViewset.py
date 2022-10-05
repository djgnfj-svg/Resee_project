from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Serializers.PostSerializer import PostsSerializer
from api.Utils.error_massge import success_msg

from posts.models import ReviewPost

from drf_yasg.utils import swagger_auto_schema

class ReviewViewSet(viewsets.ViewSet):
	@swagger_auto_schema(tags=["Review"])
	def list(self, request, book_id):
		'''
		Get review list

		리뷰 리스트를 리턴합니다.
		'''
		userid = getUserId(request.user)
		review_list = ReviewPost.objects.filter(Book_id=book_id)
		review_data = []

		first_data = ReviewPost.objects.filter(Book_id = book_id, user_id = userid, review_count__lte=8).last()
		if first_data == None:
			return Response(success_msg(204), status=status.HTTP_204_NO_CONTENT)
		base_time = first_data.created_at

		for review in review_list:
			#todo : 리뷰의 기준을 시간 22시간으로 해야되나?
			# 24시간이 지나지 리뷰 데이터에 추가 되지 않는다...
			# 흠.... 일단 패스하긴 하는데...
			# 이건 나중에 고쳐야된다.
			past_days = abs((base_time - review.created_at).days)
			if past_days == 0 and review.review_count < 1:
				review_data.append(review)
			elif past_days >= 1 and past_days < 3 and review.review_count < 2:
				review_data.append(review)
			elif past_days >= 3 and past_days < 7 and review.review_count < 3:
				review_data.append(review)
			elif past_days >= 7 and past_days < 14 and review.review_count < 4:
				review_data.append(review)
			elif past_days >= 14 and past_days < 31 and review.review_count < 5:
				review_data.append(review)
			elif past_days >= 31 and past_days < 93 and review.review_count < 6:
				review_data.append(review)
			elif past_days >= 93 and past_days < 182 and review.review_count < 7:
				review_data.append(review)
			elif past_days >= 182 and review.review_count < 8:
				review_data.append(review)

		return_data = {}
		return_data['ids'] = ''
		for i, data in enumerate(review_data):
			temp = PostsSerializer(data).data
			return_data[i] = temp
			return_data['ids'] += str(temp['id']) +" "
		return_data['ids'] = return_data['ids'].rstrip()
		return Response(return_data)

	@swagger_auto_schema(tags=["Review"])
	def create(self, request, book_id):
		'''
		Study review

		복습한 내용의 post의 카운터를 올립니다.
		'''
		ids = str(request.data['ids'])
		userid = getUserId(request.user)
		ids = ids.split(" ")
		for i in ids:
			temp = ReviewPost.objects.get(id = i, user_id = userid)
			temp.review_count_up()
		
		return Response({"msg":"{} 의 리뷰카운터를 성공적으로 올렸습니다.".format(ids)})