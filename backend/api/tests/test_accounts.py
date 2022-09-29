import json
from rest_framework import status
from rest_framework.test import APITestCase

# Create your tests here.


class testAccounts(APITestCase):
    def setUp(self):
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api-auth/"
        self.signup_data = {
            'username' : self.username,
            'email' : self.email,
            'password1' : self.password1,
            'password2' : self.password2
        }
    def test_register(self):
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_have_same_email(self):
        error_msg = "이미 이 이메일 주소로 등록된 사용자가 있습니다."
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.signup_data['username'] = "testcase2"
        response2 = self.client.post(self.signup_url, self.signup_data)
        response2_data = json.loads(response2.content)

        self.assertEqual(response2_data['email'][0], error_msg)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_have_same_username(self):
        error_msg = "User의 username은/는 이미 존재합니다."
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.signup_data['email'] = "test@test2.com"
        response2 = self.client.post(self.signup_url, self.signup_data)
        response2_data = json.loads(response2.content)
        self.assertEqual(response2_data['username'][0], error_msg)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_un_same_password1_2(self):
        error_msg = "두 개의 패스워드 필드가 서로 맞지 않습니다."
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.signup_data['email'] = "test@test2.com"
        self.signup_data['username'] = "testcase2"
        self.signup_data['password1'] = "test@0920"
        
        response2 = self.client.post(self.signup_url, self.signup_data)
        response2_data = json.loads(response2.content)
        self.assertEqual(response2_data['non_field_errors'][0], error_msg)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)