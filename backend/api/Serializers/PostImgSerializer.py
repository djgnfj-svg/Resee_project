from rest_framework import serializers

from posts.models import ReviewPostImgs

class PostImageSerializer(serializers.ModelSerializer):
	image = serializers.ImageField(use_url=True)

	class Meta :
		model = ReviewPostImgs
		fields = '__all__'

	def create(self, validated_data):
		img_data = self.context['request'].FILES
		for img in img_data.getlist('image'):
			instance = ReviewPostImgs.objects.create(
				title = validated_data["title"], 
				image = img,)
		return instance