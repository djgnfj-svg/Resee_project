from rest_framework import routers

from api.ViewSets.UserViewSet import UserLoginViewSet, UserLogoutViewSet,UserSignUpViewSet
from api.ViewSets.BookViewSet import BooksViewSet
from api.ViewSets.PostViewSet import PostViewSet
from api.ViewSets.ReviewViewSet import ReviewViewSet
from api.ViewSets.Verification import VerificationView

router = routers.DefaultRouter()
# router.register(r'UserSignUp', UserSignUpViewSet, basename="user_signup")
# router.register(r'UserLogin', UserLoginViewSet, basename="user_login")
# router.register(r'UserLogout', UserLogoutViewSet, basename="user_logout")

router.register(r'Books', BooksViewSet, basename="books")
# 목록창
router.register(r'Books/(?P<book_id>\d+)/post', PostViewSet, basename="post")
router.register(r'Books/(?P<book_id>\d+)/review', ReviewViewSet, basename="review")
router.register(r'Verification', VerificationView, basename="verification",)

# router.register(r'token/', ,basename='token_obtain_pair')
# router.register(r'token/refresh/',,basename='token_refresh')