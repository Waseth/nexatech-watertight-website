import re
from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import Service, TeamMember, ContactMessage

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'is_active']
        read_only_fields = ['created_at', 'updated_at']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'initials', 'email', 'is_active']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
        extra_kwargs = {
            'name': {'min_length': 2, 'max_length': 200},
            'email': {'max_length': 200},
            'message': {'min_length': 10, 'max_length': 5000}
        }
    
    def validate_name(self, value):
        # Remove any HTML/script tags
        clean_name = re.sub(r'<[^>]*>', '', value)
        if len(clean_name.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters")
        return clean_name.strip()
    
    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email address")
        
        # Block disposable email domains
        blocked_domains = ['tempmail.com', 'throwaway.com', 'guerrillamail.com']
        domain = value.split('@')[-1].lower()
        if domain in blocked_domains:
            raise serializers.ValidationError("Please use a valid email address")
        
        return value.lower()
    
    def validate_message(self, value):
        # Remove any potentially malicious content
        clean_message = re.sub(r'<[^>]*>', '', value)
        
        # Check for SQL injection patterns
        sql_patterns = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION', '--', ';']
        upper_msg = clean_message.upper()
        for pattern in sql_patterns:
            if pattern in upper_msg:
                raise serializers.ValidationError("Invalid characters in message")
        
        if len(clean_message.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters")
        
        return clean_message.strip()
    
    def create(self, validated_data):
        # Get request from context to capture IP
        request = self.context.get('request')
        message = ContactMessage(**validated_data)
        
        if request:
            message.ip_address = self._get_client_ip(request)
            message.user_agent = request.META.get('HTTP_USER_AGENT', '')[:500]
        
        message.save()
        
        # Log the contact submission
        from .models import AuditLog
        AuditLog.objects.create(
            action='CONTACT_SUBMISSION',
            ip_address=message.ip_address,
            details={'email': message.email, 'name': message.name}
        )
        
        return message
    
    def _get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
