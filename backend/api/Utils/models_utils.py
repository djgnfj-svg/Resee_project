from posts.models import ReviewPost, ReviewPostImgs


def set_imgdata(img_list, post_id):
	for i in img_list:
		temp = ReviewPostImgs.objects.get(id=i)
		temp.post = ReviewPost.objects.get(id=post_id)
		temp.save()