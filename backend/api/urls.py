from rest_framework import routers

from api.ViewSets.Verification import VerificationView, EmailcheckView
from api.ViewSets.BookViewset import BooksViewSet
from api.ViewSets.PostImgViewset import PostImgViewSet
from api.ViewSets.PostViewset import PostViewSet
from api.ViewSets.ReviewViewset import ReviewViewSet


router = routers.DefaultRouter()

router.register(r'books', BooksViewSet, basename="books")
router.register(r'books/(?P<book_id>\d+)/post', PostViewSet, basename="post")
router.register(r'books/(?P<book_id>\d+)/review', ReviewViewSet, basename="review")
router.register(r'verification', VerificationView, basename="verification",)
router.register(r'books/post/(?P<post_id>\d+)/imgs', PostImgViewSet, basename="postImg",)
router.register(r'emailcheck', EmailcheckView, basename="emailcheck",)
