from posts.models import ReviewPost, ReviewPostImgs


def set_imgdata(img_list, post_id):
	for i in img_list:
		temp = ReviewPostImgs.objects.get(id=i)
		temp.post = ReviewPost.objects.get(id=post_id)
		temp.save()

def del_imgdata(img_list, post_id):
	del_img_list = ReviewPostImgs.objects.filter(post_id=post_id).exclude(id__in=img_list)
	print(del_img_list)
	del_img_list.delete()
	