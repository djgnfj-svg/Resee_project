from rest_framework import routers

from api.ViewSets.BookViewSet import BooksViewSet
from api.ViewSets.PostViewSet import PostViewSet, PostImgViewSet
from api.ViewSets.ReviewViewSet import ReviewViewSet
from api.ViewSets.Verification import VerificationView, EmailcheckView


router = routers.DefaultRouter()

router.register(r'books', BooksViewSet, basename="books")
router.register(r'books/(?P<book_id>\d+)/post', PostViewSet, basename="post")
router.register(r'books/(?P<book_id>\d+)/review', ReviewViewSet, basename="review")
router.register(r'verification', VerificationView, basename="verification",)
router.register(r'books/(?P<book_id>\d+)/post/(?P<post_id>\d+)/imgs', PostImgViewSet, basename="PostImg",)
router.register(r'emailcheck', EmailcheckView, basename="Emailcheck",)
