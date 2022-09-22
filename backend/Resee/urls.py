from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg       import openapi

from dj_rest_auth.registration.views import VerifyEmailView

from accounts.urls import login_patterns
from api.urls import router
from api.Serializers.UserSerializer import ConfirmEmailView

schema_view = get_schema_view(
    openapi.Info(
        title="ReSee",
        default_version='0.5',
        description="Resee front와 소통을 하기 위해서 만든 문서입니다.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="djgnfj3795@gmail.com"), # 부가정보
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(r'swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path(r'swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/oauth/', include(login_patterns)),
    path('api/accounts/', include('dj_rest_auth.urls')),
    path('api/accounts/', include('dj_rest_auth.registration.urls')),
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]