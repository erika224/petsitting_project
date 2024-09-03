from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('メールアドレスが必要です')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_sitter = models.BooleanField(default=False)  # シッターかどうか
    date_joined = models.DateTimeField(default=timezone.now)  

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
class Pet(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    breed = models.CharField(max_length=100)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    photo = models.ImageField(upload_to='pets_photos/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)  

    def __str__(self):
        return self.name

class Sitter(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    available_start = models.DateTimeField(default=timezone.now)  
    available_end = models.DateTimeField(default=timezone.now)  

    def __str__(self):
        return self.name

class Match(models.Model):
    pet = models.ForeignKey(Pet, related_name='matches', on_delete=models.CASCADE)
    sitter = models.ForeignKey(Sitter, related_name='matches', on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)  
    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pet.name} - {self.sitter.name}'

class Booking(models.Model):
    match = models.OneToOneField(Match, on_delete=models.CASCADE, related_name='booking', null=True)
    start_date = models.DateTimeField(default=timezone.now)  
    end_date = models.DateTimeField(default=timezone.now)  
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')])

    def __str__(self):
        return f'Booking for {self.match.pet.name} with {self.match.sitter.name} from {self.start_date} to {self.end_date}'

class Message(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now) 

    def __str__(self):
        return f'Message from {self.sender.email} on {self.timestamp}'

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_given')
    sitter = models.ForeignKey(Sitter, on_delete=models.CASCADE, related_name='reviews_received', null=True, blank=True)
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now) 

    def __str__(self):
        return f'Review by {self.reviewer.email} for {self.sitter.name if self.sitter else "Unknown Sitter"}'

