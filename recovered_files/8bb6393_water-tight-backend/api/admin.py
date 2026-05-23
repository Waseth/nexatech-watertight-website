from django.contrib import admin
from .models import Service, TeamMember, ContactMessage, AuditLog, APILog

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name', 'role']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    list_editable = ['status']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['ip_address', 'user_agent', 'created_at']
    
    fieldsets = (
        ('Message Info', {
            'fields': ('name', 'email', 'message', 'status')
        }),
        ('Technical Info', {
            'fields': ('ip_address', 'user_agent', 'created_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['action', 'user', 'ip_address', 'timestamp']
    list_filter = ['action', 'timestamp']
    search_fields = ['action', 'ip_address']
    readonly_fields = ['user', 'action', 'ip_address', 'timestamp', 'details']

@admin.register(APILog)
class APILogAdmin(admin.ModelAdmin):
    list_display = ['endpoint', 'method', 'status_code', 'timestamp']
    list_filter = ['method', 'status_code', 'timestamp']
    search_fields = ['endpoint']
    readonly_fields = ['endpoint', 'method', 'ip_address', 'user', 'status_code', 'response_time', 'timestamp']
