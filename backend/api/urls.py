from rest_framework import routers

from api.ViewSets.BookViewSet import BooksViewSet
from api.ViewSets.PostViewSet import PostViewSet
from api.ViewSets.ReviewViewSet import ReviewViewSet
from api.ViewSets.Verification import VerificationView

router = routers.DefaultRouter()

router.register(r'Books', BooksViewSet, basename="books")
router.register(r'Books/(?P<book_id>\d+)/post', PostViewSet, basename="post")
router.register(r'Books/(?P<book_id>\d+)/review', ReviewViewSet, basename="review")
router.register(r'Verification', VerificationView, basename="verification",)
