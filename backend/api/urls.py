from rest_framework import routers

from api.ViewSets.UserViewSet import UserLoginViewSet, UserLogoutViewSet,UserSignUpViewSet
from api.ViewSets.BookViewSet import BooksViewSet

router = routers.DefaultRouter()
router.register(r'UserSignUp', UserSignUpViewSet, basename="user_signup")
router.register(r'UserLogin', UserLoginViewSet, basename="user_login")
router.register(r'UserLogout', UserLogoutViewSet, basename="user_logout")

router.register(r'Books', BooksViewSet, basename="books")