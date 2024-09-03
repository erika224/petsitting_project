from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginUser, RegisterUser, UserDetailView, PetViewSet, SitterSearchView, SitterViewSet, MatchViewSet, MessageViewSet, BookingViewSet, ReviewViewSet, proxy_geolonia

router = DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'sitters', SitterViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('login/', LoginUser.as_view(), name='login'),  
    path('register/', RegisterUser.as_view(), name='register'), 
    path('user/', UserDetailView.as_view(), name='user-detail'), 
    path('pets/', PetViewSet.as_view({'get': 'list', 'post': 'create'}), name='pet-list'),  
    path('sitter-search/', SitterSearchView.as_view({'get': 'list'}), name='sitter-search'), 
    path('matches/', MatchViewSet.as_view({'get': 'list', 'post': 'create'}), name='match-list'),
    path('pets/<int:pk>/', PetViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='pet-detail'),
    path('sitter-search/<int:pk>/', SitterSearchView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='sitter-detail'),
    path('matches/<int:pk>/', MatchViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='match-detail'),
    path('proxy_geolonia/', proxy_geolonia, name='proxy_geolonia'),
    path('', include(router.urls)), 
]