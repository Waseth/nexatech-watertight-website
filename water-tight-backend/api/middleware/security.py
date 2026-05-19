import time
import re
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseForbidden

class SecurityMiddleware(MiddlewareMixin):
    """Block malicious requests"""
    
    def process_request(self, request):
        # Block SQL injection attempts in URLs
        sql_patterns = ['union.*select', 'select.*from', 'insert.*into', 'drop.*table', '--', ';.*--']
        url_path = request.path.lower()
        
        for pattern in sql_patterns:
            if re.search(pattern, url_path):
                return HttpResponseForbidden("Invalid request")
        
        # Set start time for logging
        request.start_time = time.time()
        
        return None
    
    def process_response(self, request, response):
        # Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response
