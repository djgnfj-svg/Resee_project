from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

class UserManager(BaseUserManager):
	def create_user(self, email, date_of_birth, password=None):
		if not email:
			raise ValueError('Users must have an email address')

		user = self.model(
			email=self.normalize_email(email),
			date_of_birth=date_of_birth,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, date_of_birth, password):
		user = self.create_user(
			email,
			password=password,
			date_of_birth=date_of_birth,
		)
		user.is_admin = True
		user.save(using=self._db)
		return user


class User(AbstractBaseUser):
	username = models.CharField(unique=True, max_length=20, null=False)
	email = models.EmailField(verbose_name='email', max_length=255,	unique=True,)
	date_of_birth = models.DateField(auto_now_add=True)
	verified = models.BooleanField(default=False, null=False)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)
	
	objects = UserManager()

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['date_of_birth']

	def __str__(self):
		return self.email

	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	@property
	def is_staff(self):
		return self.is_admin

class UserVerification(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	key = models.CharField(null=False, max_length=200, unique=True)
	verified = models.BooleanField(default=False)
	expired_at = models.DateTimeField(null=False)
	verified_at = models.DateTimeField(null=True)
	created_at = models.DateTimeField(auto_now_add=True, null=False)