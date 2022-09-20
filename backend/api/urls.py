from rest_framework import routers

from api.Views.Verification import VerificationView, EmailcheckView
from api.Views.BookViewset import BooksViewSet
from api.Views.PostImgViewset import PostImgViewSet
from api.Views.PostViewset import PostViewSet
from api.Views.ReviewViewset import ReviewViewSet


router = routers.DefaultRouter()

router.register(r'books', BooksViewSet, basename="books")
router.register(r'books/(?P<book_id>\d+)/posts', PostViewSet, basename="post")
router.register(r'books/(?P<book_id>\d+)/review', ReviewViewSet, basename="review")
# router.register(r'verification', VerificationView, basename="verification",)
router.register(r'books/post/(?P<post_id>\d+)/imgs', PostImgViewSet, basename="postImg",)
router.register(r'emailcheck', EmailcheckView, basename="emailcheck",)
