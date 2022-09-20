from django.test import TestCase

from accounts.models import User

# Create your tests here.
class testUserModel(TestCase):
    def setUp(self):
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api/accounts/"
        User.objects.create(username=self.username, email = self.email,
        password=self.password1)

    def test_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('username').verbose_name
        self.assertEquals(field_label, "username")