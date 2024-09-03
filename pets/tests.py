from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Pet, Match, Message, Booking, Review
from .serializers import MatchSerializer


class UserAuthTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="testuser@example.com", name="Test User", password="testpass123")

    def test_user_login(self):
        url = reverse('login')
        data = {
            "email": "testuser@example.com",
            "password": "testpass123"
        }
        response = self.client.post(url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(email='test@example.com', name='Test User', password='testpass')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.name, 'Test User')

class PetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="testuser@example.com", name="Test User", password="testpassword")
        self.client.force_authenticate(user=self.user)

    def test_create_pet(self):
        url = reverse('pet-list')
        data = {
            "name": "Buddy",
            "breed": "Golden Retriever",
            "weight": 30.5,
            "owner": self.user.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_pet(self):
        pet = Pet.objects.create(name='Buddy', breed='Golden Retriever', weight=30.5, owner=self.user)
        url = reverse('pet-detail', args=[pet.id])
        data = {
            'name': 'Buddy',
            'breed': 'Golden Retriever',
            'weight': 35.0,
            'owner': self.user.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_pet(self):
        pet = Pet.objects.create(name='Buddy', breed='Golden Retriever', weight=30.5, owner=self.user)
        url = reverse('pet-detail', args=[pet.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class MatchTests(APITestCase):

    def setUp(self):
        self.owner = User.objects.create_user(email="owner@example.com", name="Owner", password="password")
        self.sitter = User.objects.create_user(email="sitter@example.com", name="Sitter", password="password")
        self.pet = Pet.objects.create(name="Buddy", breed="Golden Retriever", weight=30.5, owner=self.owner)

    def test_create_match(self):
        url = reverse('match-list')
        data = {'pet': self.pet.id, 'sitter': self.sitter.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Match.objects.count(), 1)
        self.assertEqual(Match.objects.get().pet.name, 'Buddy')

    def test_get_matches(self):
        match = Match.objects.create(pet=self.pet, sitter=self.sitter)
        url = reverse('match-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_match(self):
        match = Match.objects.create(pet=self.pet, sitter=self.sitter)
        url = reverse('match-detail', args=[match.id])
        data = {'pet': self.pet.id, 'sitter': self.sitter.id}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_match(self):
        match = Match.objects.create(pet=self.pet, sitter=self.sitter)
        url = reverse('match-detail', args=[match.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Match.objects.count(), 0)

class MessageTests(APITestCase):

    def setUp(self):
        self.owner = User.objects.create_user(email="owner@example.com", name="Owner", password="password")
        self.sitter = User.objects.create_user(email="sitter@example.com", name="Sitter", password="password")
        self.pet = Pet.objects.create(name="Buddy", breed="Golden Retriever", weight=30.5, owner=self.owner)
        self.match = Match.objects.create(pet=self.pet, sitter=self.sitter)
    
    def test_create_message(self):
        url = reverse('message-list')
        data = {'match': self.match.id, 'sender': self.owner.id, 'content': 'Hello!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 1)
        self.assertEqual(Message.objects.get().content, 'Hello!')

    def test_get_messages(self):
        Message.objects.create(match=self.match, sender=self.owner, content='Hello!')
        url = reverse('message-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_message(self):
        message = Message.objects.create(match=self.match, sender=self.owner, content='Hello!')
        url = reverse('message-detail', args=[message.id])
        data = {'match': self.match.id, 'sender': self.owner.id, 'content': 'Hi there!'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Message.objects.get().content, 'Hi there!')

    def test_delete_message(self):
        message = Message.objects.create(match=self.match, sender=self.owner, content='Hello!')
        url = reverse('message-detail', args=[message.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Message.objects.count(), 0)

class BookingTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="testuser@example.com", name="Test User", password="testpass123")
        self.pet = Pet.objects.create(name="Buddy", breed="Golden Retriever", weight=30.5, owner=self.user)
        self.client.force_authenticate(user=self.user)

    def test_create_booking(self):
        url = reverse('booking-list')
        data = {
            "pet": self.pet.id,
            "owner": self.user.id,
            "sitter": self.user.id,
            "start_date": "2024-08-15T00:00:00Z",
            "end_date": "2024-08-20T00:00:00Z",
            "status": "Pending"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_bookings(self):
        url = reverse('booking-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_booking(self):
        booking = Booking.objects.create(
            pet=self.pet,
            owner=self.user,
            sitter=self.user,
            start_date="2024-08-15T00:00:00Z",
            end_date="2024-08-20T00:00:00Z",
            status="Pending"
        )
        url = reverse('booking-detail', args=[booking.id])
        data = {
            "status": "Confirmed"
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_booking(self):
        booking = Booking.objects.create(
            pet=self.pet,
            owner=self.user,
            sitter=self.user,
            start_date="2024-08-15T00:00:00Z",
            end_date="2024-08-20T00:00:00Z",
            status="Pending"
        )
        url = reverse('booking-detail', args=[booking.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ReviewTests(APITestCase):
    def setUp(self):
        self.reviewer = User.objects.create_user(email="reviewer@example.com", name="Reviewer", password="testpass123")
        self.reviewee = User.objects.create_user(email="reviewee@example.com", name="Reviewee", password="testpass123")
        self.client.force_authenticate(user=self.reviewer)

    def test_create_review(self):
        url = reverse('review-list')
        data = {
            "reviewer": self.reviewer.id,
            "reviewee": self.reviewee.id,
            "rating": 5,
            "comment": "Great service!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_reviews(self):
        url = reverse('review-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_review(self):
        review = Review.objects.create(
            reviewer=self.reviewer,
            reviewee=self.reviewee,
            rating=4,
            comment="Good service"
        )
        url = reverse('review-detail', args=[review.id])
        data = {
            "reviewer": self.reviewer.id,
            "reviewee": self.reviewee.id, 
            "rating": 5,
            "comment": "Excellent service!"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_review(self):
        review = Review.objects.create(
            reviewer=self.reviewer,
            reviewee=self.reviewee,
            rating=4,
            comment="Good service"
        )
        url = reverse('review-detail', args=[review.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class IntegrationTests(APITestCase):

    def setUp(self):
        # Create users
        self.user1 = User.objects.create_user(email="user1@example.com", name="User1", password="password123")
        self.user2 = User.objects.create_user(email="user2@example.com", name="User2", password="password123")

        # Get auth tokens
        self.token1 = self.client.post(reverse('login'), {'email': 'user1@example.com', 'password': 'password123'}, format='json').data['token']
        self.token2 = self.client.post(reverse('login'), {'email': 'user2@example.com', 'password': 'password123'}, format='json').data['token']

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)

    def test_integration_flow(self):
        # Create a pet
        pet_data = {
            'name': 'Buddy',
            'breed': 'Golden Retriever',
            'weight': 30.5,
            'owner': self.user1.id
        }
        response = self.client.post(reverse('pet-list'), pet_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        pet_id = response.data['id']

        # Create a match
        match_data = {
            'pet': pet_id,
            'sitter': self.user2.id
        }
        response = self.client.post(reverse('match-list'), match_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        match_id = response.data['id']

        # Send a message
        message_data = {
            'match': match_id,
            'sender': self.user1.id,
            'content': 'Hello, can you take care of my pet?'
        }
        response = self.client.post(reverse('message-list'), message_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Create a booking
        booking_data = {
            'pet': pet_id,
            'owner': self.user1.id,
            'sitter': self.user2.id,
            'start_date': '2023-01-01T10:00:00Z',
            'end_date': '2023-01-02T10:00:00Z',
            'status': 'Confirmed'
        }
        response = self.client.post(reverse('booking-list'), booking_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Post a review
        review_data = {
            'reviewer': self.user1.id,
            'reviewee': self.user2.id,
            'rating': 5,
            'comment': 'Great sitter!'
        }
        response = self.client.post(reverse('review-list'), review_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
