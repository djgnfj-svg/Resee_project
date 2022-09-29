from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User

from books.models import ReviewBook

class testPosts(APITestCase):
    def setUp(self):
        #books 만들고
        # post crud
        #sign up data
        self.signup_url = "/api-auth/"
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_data = {
            'username' : self.username,
            'email' : self.email,
            'password1' : self.password1,
            'password2' : self.password2
        }
        response = self.client.post(self.signup_url, self.signup_data)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.get('access_token')}")
        #book data
        ReviewBook.objects.create(title = "title", \
            rough_description = "rough_description",
            user = User.objects.get(email=self.email)
            )
        
        #post data
        self.target_url = '/api/books/1/posts/'
        self.post_id_url = '1/'
        self.post_title = "post_title"
        self.post_description = "post_description"
        self.post_create_data = {
            "title" : self.post_title,
            "description" : self.post_description,
        }
        self.post_update_data = {
            "title" : self.post_title + "update",
            "description" : self.post_description + "update",
        }

    def test_get_posts(self):
        response = self.client.get(self.target_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    #성공과 실패 모두 테스트 해봐야 할꺼같다
    def test_create_posts(self):
        response = self.client.post(self.target_url,self.post_create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_posts(self):
        response = self.client.post(self.target_url,self.post_create_data)
        response = self.client.put(self.target_url + self.post_id_url, self.post_update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_posts(self):
        response = self.client.post(self.target_url, self.post_create_data)
        response = self.client.delete(self.target_url + self.post_id_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    # def test_books_max_count(self):