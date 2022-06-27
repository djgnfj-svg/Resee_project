from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Seriailzers.PostSerializer import PostsSerializer

from books.models import ReviewPost

class ReviewViewSet(viewsets.ViewSet):
	def list(self, request, book_id):
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)
		review_list = ReviewPost.objects.filter(Book_id=book_id)
		return_data = []
		first_data = ReviewPost.objects.filter(Book_id = book_id, user_id = userid, review_count__lte=8).first()
		base_time = first_data.created_at
		for review in review_list:
			past_days = (review.created_at - base_time).days
			if past_days == 0 and review.review_count < 1:
				return_data.append(review)
			elif past_days > 1 and past_days < 3 and review.review_count < 2:
				return_data.append(review)
			elif past_days > 3 and past_days < 7 and review.review_count < 3:
				return_data.append(review)
			elif past_days > 7 and past_days < 14 and review.review_count < 4:
				return_data.append(review)
			elif past_days > 14 and past_days < 31 and review.review_count < 5:
				return_data.append(review)
			elif past_days > 31 and past_days < 93 and review.review_count < 6:
				return_data.append(review)
			elif past_days > 93 and past_days < 182 and review.review_count < 7:
				return_data.append(review)
			elif past_days > 182 and review.review_count < 8:
				return_data.append(review)

		review_data = {}
		for i, data in enumerate(return_data):
			review_data[i] = PostsSerializer(data).data

		return Response(review_data, status=status.HTTP_200_OK)
	def create(self, request, book_id):
		ids = str(request.data['ids'])
		if request.user.is_anonymous:
			userid = int(request.session.get("user"))
		else:
			userid = getUserId(request.user)
		ids = ids.split(" ")
		for i in ids:
			temp = ReviewPost.objects.get(id = i, user_id = userid)
			temp.review_count_up()
		
		return Response({"msg":"{} 의 리뷰카운터를 성공적으로 올렸습니다.".format(ids)}, status=status.HTTP_200_OK)