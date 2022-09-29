from rest_framework import viewsets, status, mixins
from rest_framework.response import Response

from api.Utils.error_massge import error_msg
from api.Serializers.PostImgSerializer import PostImageSerializer

from posts.models import ReviewPostImgs

from drf_yasg.utils import swagger_auto_schema
class PostImgViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
	serializer_class = PostImageSerializer
	queryset = ReviewPostImgs.objects.filter().order_by("created_at")

	@swagger_auto_schema(tags=["PostImg에 관한 요청입니다."])
	def create(self, request, post_id):
		serializer = PostImageSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)