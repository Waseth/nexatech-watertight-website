from django.core.management.base import BaseCommand
from api.models import Service, TeamMember

class Command(BaseCommand):
    help = 'Seed initial data for the website'

    def handle(self, *args, **kwargs):
        # Add Services
        services = [
            {'title': 'Cloud Architecture', 'description': 'Scalable, secure cloud infrastructure tailored to your business needs. AWS, Azure, and GCP certified.', 'icon': '☁️', 'order': 1},
            {'title': 'Cybersecurity', 'description': 'Enterprise-grade protection with 24/7 monitoring, threat detection, and rapid incident response.', 'icon': '🔒', 'order': 2},
            {'title': 'AI & Analytics', 'description': 'Leverage machine learning for predictive insights, automation, and data-driven decisions.', 'icon': '🤖', 'order': 3},
            {'title': 'DevOps', 'description': 'Streamline your development lifecycle with CI/CD, containerization, and infrastructure as code.', 'icon': '⚙️', 'order': 4},
        ]

        for service_data in services:
            Service.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )

       
        team = [
            {'name': 'James Mwangi', 'role': 'CEO & Founder', 'initials': 'JM', 'order': 1},
            {'name': 'Sarah Wanjiku', 'role': 'CTO', 'initials': 'SW', 'order': 2},
            {'name': 'Michael Otieno', 'role': 'Lead Architect', 'initials': 'MO', 'order': 3},
            {'name': 'Grace Achieng', 'role': 'Security Specialist', 'initials': 'GA', 'order': 4},
        ]

        for member_data in team:
            TeamMember.objects.get_or_create(
                name=member_data['name'],
                defaults=member_data
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))