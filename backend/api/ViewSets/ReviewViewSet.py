from rest_framework import viewsets, status, exceptions
from rest_framework.response import Response

from api.Utils.getUser import getUserId
from api.Seriailzers.PostSerializer import PostsSerializer

from books.models import ReviewPost

class ReviewViewSet(viewsets.ViewSet):
	def list(self, request, book_id):
		userid = getUserId(request.user)
		review_list = ReviewPost.objects.filter(Book_id=book_id)
		review_data = []

		first_data = ReviewPost.objects.filter(Book_id = book_id, user_id = userid, review_count__lte=8).first()
		if first_data == None:
			raise exceptions.NotFound({"msg" : "써야있지.."}, code=401)
		base_time = first_data.created_at
			

		for review in review_list:
			past_days = (review.created_at - base_time).days
			if past_days == 0 and review.review_count < 1:
				review_data.append(review)
			elif past_days > 1 and past_days < 3 and review.review_count < 2:
				review_data.append(review)
			elif past_days > 3 and past_days < 7 and review.review_count < 3:
				review_data.append(review)
			elif past_days > 7 and past_days < 14 and review.review_count < 4:
				review_data.append(review)
			elif past_days > 14 and past_days < 31 and review.review_count < 5:
				review_data.append(review)
			elif past_days > 31 and past_days < 93 and review.review_count < 6:
				review_data.append(review)
			elif past_days > 93 and past_days < 182 and review.review_count < 7:
				review_data.append(review)
			elif past_days > 182 and review.review_count < 8:
				review_data.append(review)

		return_data = {}
		return_data['ids'] = ''
		for i, data in enumerate(review_data):
			temp = PostsSerializer(data).data
			return_data[i] = temp
			return_data['ids'] += str(temp['id']) +" "
		return_data['ids'] = return_data['ids'].rstrip()
		return Response(return_data, status=status.HTTP_200_OK)
	def create(self, request, book_id):
		ids = str(request.data['ids'])
		userid = getUserId(request.user)
		ids = ids.split(" ")
		for i in ids:
			temp = ReviewPost.objects.get(id = i, user_id = userid)
			temp.review_count_up()
		
		return Response({"msg":"{} 의 리뷰카운터를 성공적으로 올렸습니다.".format(ids)}, status=status.HTTP_200_OK)