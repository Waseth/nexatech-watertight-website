from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.core.cache import cache
from .models import Service, TeamMember, ContactMessage, AuditLog, APILog
from .serializers import ServiceSerializer, TeamMemberSerializer, ContactMessageSerializer
import time

class ContactRateThrottle(AnonRateThrottle):
    rate = '5/hour'

class ServiceListAPIView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    throttle_classes = [AnonRateThrottle]
    
    def list(self, request, *args, **kwargs):
        # Cache the response for 1 hour
        cache_key = 'services_list'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)
        
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 3600)  # Cache for 1 hour
        
        self._log_api_call(request, 200)
        return response
    
    def _log_api_call(self, request, status_code):
        start_time = getattr(request, 'start_time', time.time())
        response_time = (time.time() - start_time) * 1000
        
        APILog.objects.create(
            endpoint=request.path,
            method=request.method,
            ip_address=self._get_client_ip(request),
            user=request.user if request.user.is_authenticated else None,
            status_code=status_code,
            response_time=response_time
        )
    
    def _get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class TeamListAPIView(generics.ListAPIView):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    throttle_classes = [AnonRateThrottle]
    
    def list(self, request, *args, **kwargs):
        cache_key = 'team_list'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)
        
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 3600)
        return response

class ContactCreateAPIView(APIView):
    throttle_classes = [ContactRateThrottle]
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Check for rate limiting by IP
        ip = self._get_client_ip(request)
        cache_key = f'contact_ip_{ip}'
        attempts = cache.get(cache_key, 0)
        
        if attempts >= 5:  # Max 5 attempts per IP
            return Response(
                {"error": "Too many attempts. Please try again later."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        
        # Validate honeypot field (if exists, it's a bot)
        if request.data.get('website'):
            return Response(
                {"error": "Spam detected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ContactMessageSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            
            # Increment attempt counter
            cache.set(cache_key, attempts + 1, 3600)  # Reset after 1 hour
            
            return Response(
                {"message": "Message sent successfully. We'll get back to you within 24 hours."},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def _get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class ServiceAdminAPIView(viewsets.ModelViewSet):
    """Admin-only operations for services"""
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminUser]
    
    def perform_create(self, serializer):
        serializer.save()
        cache.delete('services_list')  # Clear cache
        AuditLog.objects.create(
            user=self.request.user,
            action='SERVICE_CREATED',
            ip_address=self._get_client_ip(self.request),
            details={'service': serializer.data}
        )
    
    def _get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
