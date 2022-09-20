import json
from rest_framework import status
from rest_framework.test import APITestCase

class testBooks(APITestCase):
    def setUp(self):
        #계정생성하고 accsekey 
        self.target_url = '/api/books/'
        self.signup_url = "/api/accounts/"
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
        self.signup_url = "/api/accounts/"
        response = self.client.post(self.signup_url, self.signup_data)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data.get('access_token')}")
    
        self.book_create_title = "title"
        self.book_create_rough_description = "rough_description"
        self.book_create_data ={
            "title" : self.book_create_title,
            "rough_description" : self.book_create_rough_description
        }
        self.book_update_data = {
            "title" : "update_title",
            "rough_description" : "update_description"
        }
    def test_get_books(self):
        response = self.client.get(self.target_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_create_books(self):
        response = self.client.post(self.target_url, self.book_create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_books(self):
        response = self.client.post(self.target_url, self.book_create_data)
        response = self.client.put(self.target_url + "1/", self.book_create_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_books(self):
        response = self.client.post(self.target_url, self.book_create_data)
        response = self.client.delete(self.target_url + "1/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    # def test_books_max_count(self):