from rest_framework import routers

from .apis import UserInfoViewSet, UserGameViewSet, UserStatsViewSet

router = routers.DefaultRouter()
router.register(r'UserInfo', UserInfoViewSet, basename="api_user")
router.register(r'UserGameRecord', UserGameViewSet, basename="api_gamerecord")
router.register(r'UserStats', UserStatsViewSet, basename="api_stats")