import os
from django.test import TestCase
from accounts.models import User
from books.models import ReviewBook
from posts.models import ReviewPostImgs

from posts.models import ReviewPost

from Resee.settings import BASE_DIR
# Create your tests here.

class PostTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="test@test.com", username="testuser")
        self.book = ReviewBook.objects.create(title="test_book", user=self.user)
        self.posts = ReviewPost.objects.create(
            title = "테스트입니다",
            description = "테스트입니다",
            user = self.user,
            Book = self.book,
        )
        self.load_img1 = ReviewPostImgs.objects.create(title="test_img1")
        self.load_img1.image = os.path.join(BASE_DIR,"templates/static/test_img/1-1.jpg")
        self.load_img1.save()

        self.load_img2 = ReviewPostImgs.objects.create(title="test_img2")
        self.load_img2.image = os.path.join(BASE_DIR,"templates/static/test_img/1-2.jpg")
        self.load_img2.save()

    def test_posts_create(self):
        temp = ReviewPost.objects.create(
            title = "",
            description = "",
            image_ids = [1, 2],
            user = self.user,
            Book = self.book
        )
    def test_posts_update(self):
        temp = ReviewPost.objects.create(
            title = "",
            description = "",
            image_ids = [1, 2],
            user = self.user,
            Book = self.book
        )
        temp.update(image_ids=[2])
        self.assertEqual(ReviewPostImgs.objects.count(), 1)