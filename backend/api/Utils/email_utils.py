
import uuid # 완전 유닉하지않음 그래서 pk를 넣기로함 그래서 고유성 업
import hashlib #단반향 암호화, 양방향 암호화 sha256 md5 ... aes des

from datetime import timedelta

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone

from rest_framework.reverse import reverse

from accounts.models import UserVerification

def create_email_key(user_id):
	random_key = str(uuid.uuid4())
	sha_data = hashlib.sha256()
	sha_data.update(str(user_id).encode('utf-8'))
	hash_key = sha_data.hexdigest()
	
	return random_key[::2] + hash_key[::2]



def send_verification_mail(request, user, receiver):
	key = create_email_key(user.id)
	link = 'http://' + request.get_host() + '/api/Verification/' + '?key=' + key
	
	expired_at = timezone.now() + timedelta(days=3)
	UserVerification.objects.create(user=user, key=key, expired_at=expired_at)
	
	email_context = {'link' : link}
	msg_plain = render_to_string('email/email.txt', email_context)
	msg_html = render_to_string('email/email.html', email_context)
	
	send_mail(
		'이메일 인증을 완료해주세요', msg_plain,
		'djgnfj3795@gmail.com',
		[receiver],
		html_message=msg_html,
	)