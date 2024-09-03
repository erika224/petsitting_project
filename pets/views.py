from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from .models import User, Pet, Match, Message, Booking, Review, Sitter
from .serializers import UserSerializer, PetSerializer, MatchSerializer, MessageSerializer, BookingSerializer, ReviewSerializer, SitterSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class SitterSearchView(viewsets.ModelViewSet):
    serializer_class = SitterSerializer

    def get_queryset(self):
        queryset = Sitter.objects.all()
        location = self.request.query_params.get('location')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        latitude = self.request.query_params.get('latitude')
        longitude = self.request.query_params.get('longitude')

        # フィルタリングロジック
        if location:
            queryset = queryset.filter(location__icontains=location)
        if start_date and end_date:
            queryset = queryset.filter(
                available_start__lte=start_date, available_end__gte=end_date)
        if latitude and longitude:
            user_location = Point(float(longitude), float(latitude), srid=4326)
            queryset = queryset.annotate(distance=Distance('location', user_location)).order_by('distance')

        return queryset

class SitterViewSet(viewsets.ModelViewSet):
    queryset = Sitter.objects.all()
    serializer_class = SitterSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


def home(request):
    return render(request, 'index.html')


@method_decorator(csrf_exempt, name='dispatch')
class RegisterUser(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(APIView):
    permission_classes = [AllowAny]  
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(f"Email received: {email}")
        print(f"Password received: {password}")
        user = authenticate(username=email, password=password)


        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            print("Authentication failed: Invalid credentials")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        print(f"request.user: {request.user}")
        if request.user is None:
            return Response({"error": "User not found"}, status=404)
        
        try:
            if not request.user or not request.user.is_authenticated:
                return Response({"error": "User not authenticated"}, status=401)

            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error serializing user data: {e}")
            return Response({"error": "An error occurred while serializing user data"}, status=500)

@require_http_methods(["GET"])
def proxy_geolonia(request):
    url = "https://geolonia.github.io/japanese-addresses/api/ja.json"
    response = requests.get(url)
    data = response.json()
    return JsonResponse(data, safe=False)