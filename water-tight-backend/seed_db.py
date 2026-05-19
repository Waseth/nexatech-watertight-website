import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexa_backend.settings')
django.setup()

from api.models import Service, TeamMember

# Add services
services_data = [
    {'title': 'Cloud Architecture', 'description': 'Scalable, secure cloud infrastructure tailored to your business needs. AWS, Azure, and GCP certified.', 'icon': '☁️', 'order': 1},
    {'title': 'Cybersecurity', 'description': 'Enterprise-grade protection with 24/7 monitoring, threat detection, and rapid incident response.', 'icon': '🔒', 'order': 2},
    {'title': 'AI & Analytics', 'description': 'Leverage machine learning for predictive insights, automation, and data-driven decisions.', 'icon': '🤖', 'order': 3},
    {'title': 'DevOps', 'description': 'Streamline your development lifecycle with CI/CD, containerization, and infrastructure as code.', 'icon': '⚙️', 'order': 4},
]

for service_data in services_data:
    service, created = Service.objects.get_or_create(
        title=service_data['title'],
        defaults=service_data
    )
    if created:
        print(f"Created service: {service.title}")

# Add team members
team_data = [
    {'name': 'James Mwangi', 'role': 'CEO & Founder', 'initials': 'JM', 'order': 1},
    {'name': 'Sarah Wanjiku', 'role': 'CTO', 'initials': 'SW', 'order': 2},
    {'name': 'Michael Otieno', 'role': 'Lead Architect', 'initials': 'MO', 'order': 3},
    {'name': 'Grace Achieng', 'role': 'Security Specialist', 'initials': 'GA', 'order': 4},
]

for member_data in team_data:
    member, created = TeamMember.objects.get_or_create(
        name=member_data['name'],
        defaults=member_data
    )
    if created:
        print(f"Created team member: {member.name}")

print(f"\nTotal services: {Service.objects.count()}")
print(f"Total team members: {TeamMember.objects.count()}")
