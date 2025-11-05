"""
Emergency Router for Disaster Recovery & NRPG Bot

Routes emergency calls based on severity and service type.
Service Areas: Brisbane, Ipswich, Logan
Business: Phill McGurk - IICRC Master Restorer
Emergency Contact: 1300 309 361

NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
"""

from typing import Dict, Optional
from dataclasses import dataclass
from datetime import datetime
from intent_classifier import ServiceType, EmergencyLevel, IntentClassification


@dataclass
class EmergencyRoute:
    """Emergency routing decision"""
    route_to: str
    priority: str
    response_time: str
    contact_method: str
    message: str
    escalate: bool


class DisasterRecoveryEmergencyRouter:
    """
    Emergency router for Disaster Recovery bot

    Routes calls based on:
    - Emergency severity (critical, urgent, high, standard)
    - Service type (water, fire, mould, etc.)
    - Time of day (24/7 availability)
    - Service area (Brisbane/Ipswich/Logan)
    """

    def __init__(self):
        self.emergency_contact = "1300 309 361"
        self.business_name = "Disaster Recovery Brisbane/Ipswich/Logan"
        self.master_restorer = "Phill McGurk - IICRC Master Restorer"

        # Response time SLAs by emergency level
        self.response_times = {
            EmergencyLevel.CRITICAL: "Immediate (within 60 minutes)",
            EmergencyLevel.URGENT: "Same day (within 4 hours)",
            EmergencyLevel.HIGH: "Within 24 hours",
            EmergencyLevel.STANDARD: "Within 48 hours",
            EmergencyLevel.INQUIRY: "Within 1 business day"
        }

        # Service-specific protocols
        self.service_protocols = {
            ServiceType.WATER_DAMAGE: {
                "priority": "HIGH",
                "note": "Water damage worsens every hour - immediate response critical"
            },
            ServiceType.FIRE_DAMAGE: {
                "priority": "URGENT",
                "note": "Smoke and soot continue damaging property - fast response essential"
            },
            ServiceType.MOULD_REMEDIATION: {
                "priority": "HIGH",
                "note": "Mould poses health risks - proper assessment required"
            },
            ServiceType.STORM_DAMAGE: {
                "priority": "HIGH",
                "note": "Secondary damage possible - secure property first"
            },
            ServiceType.BIOHAZARD: {
                "priority": "CRITICAL",
                "note": "Health hazard - requires Hazmat Licensed professional (Phill McGurk)"
            },
            ServiceType.SEWAGE_CLEANUP: {
                "priority": "CRITICAL",
                "note": "Category 3 contamination - requires IICRC Master Restorer protocols"
            },
            ServiceType.TRAUMA_CLEANING: {
                "priority": "CRITICAL",
                "note": "Sensitive situation requiring professional biohazard cleanup"
            },
            ServiceType.COMMERCIAL: {
                "priority": "URGENT",
                "note": "Business interruption costs escalate - priority response"
            }
        }

    def route(
        self,
        classification: IntentClassification,
        location: Optional[str] = None
    ) -> EmergencyRoute:
        """
        Route emergency based on classification

        Args:
            classification: Intent classification result
            location: Customer location (suburb)

        Returns:
            EmergencyRoute with routing decision and message
        """
        service_type = classification.service_type
        emergency_level = classification.emergency_level

        # Determine if this needs immediate escalation
        escalate = self._should_escalate(service_type, emergency_level)

        # Get appropriate routing
        if escalate:
            return self._create_emergency_route(classification, location)
        else:
            return self._create_standard_route(classification, location)

    def _should_escalate(
        self,
        service_type: ServiceType,
        emergency_level: EmergencyLevel
    ) -> bool:
        """Determine if call should be escalated to emergency line"""
        # Always escalate critical emergencies
        if emergency_level == EmergencyLevel.CRITICAL:
            return True

        # Escalate urgent calls for high-risk services
        if emergency_level == EmergencyLevel.URGENT:
            high_risk_services = [
                ServiceType.FIRE_DAMAGE,
                ServiceType.BIOHAZARD,
                ServiceType.SEWAGE_CLEANUP,
                ServiceType.TRAUMA_CLEANING
            ]
            if service_type in high_risk_services:
                return True

        # Escalate high priority water damage (time-sensitive)
        if service_type == ServiceType.WATER_DAMAGE and emergency_level.value >= 5:
            return True

        return False

    def _create_emergency_route(
        self,
        classification: IntentClassification,
        location: Optional[str]
    ) -> EmergencyRoute:
        """Create emergency routing (immediate response)"""
        service_type = classification.service_type
        emergency_level = classification.emergency_level

        # Get service-specific protocol
        protocol = self.service_protocols.get(
            service_type,
            {"priority": "URGENT", "note": "Emergency response required"}
        )

        # Build emergency message
        message = self._build_emergency_message(
            service_type,
            emergency_level,
            protocol,
            location
        )

        return EmergencyRoute(
            route_to="Emergency Response Team",
            priority=protocol["priority"],
            response_time=self.response_times[emergency_level],
            contact_method=f"Phone: {self.emergency_contact}",
            message=message,
            escalate=True
        )

    def _create_standard_route(
        self,
        classification: IntentClassification,
        location: Optional[str]
    ) -> EmergencyRoute:
        """Create standard routing (normal scheduling)"""
        service_type = classification.service_type
        emergency_level = classification.emergency_level

        # Build standard message
        message = self._build_standard_message(service_type, location)

        return EmergencyRoute(
            route_to="Customer Service",
            priority="STANDARD",
            response_time=self.response_times[emergency_level],
            contact_method=f"Phone: {self.emergency_contact} or online form",
            message=message,
            escalate=False
        )

    def _build_emergency_message(
        self,
        service_type: ServiceType,
        emergency_level: EmergencyLevel,
        protocol: Dict,
        location: Optional[str]
    ) -> str:
        """Build emergency response message"""
        location_msg = f" in {location}" if location else ""

        service_name = service_type.value.replace('_', ' ').title()

        message = f"""
*** EMERGENCY: {service_name}{location_msg} ***

Priority: {protocol['priority']}
Response Time: {self.response_times[emergency_level]}

{protocol['note']}

IMMEDIATE ACTION REQUIRED:
1. Call our 24/7 emergency line: {self.emergency_contact}
2. Our emergency response team will be dispatched immediately
3. {self.master_restorer} ensures all work meets IICRC protocols

Why call us immediately:
- One of a limited number of Master Restorers in Brisbane & QLD
- IICRC Master Restorer certification (highest industry standard)
- Professional damage assessments from $550
- Hazmat Licensed and Asbestos Assessor certified
- 24/7 emergency response across Brisbane, Ipswich, and Logan

Emergency Contact: {self.emergency_contact}
(Available 24/7 - Call Now)
"""
        return message.strip()

    def _build_standard_message(
        self,
        service_type: ServiceType,
        location: Optional[str]
    ) -> str:
        """Build standard inquiry message"""
        location_msg = f" in {location}" if location else ""
        service_name = service_type.value.replace('_', ' ').title()

        message = f"""
Thank you for contacting {self.business_name}.

Service: {service_name}{location_msg}

{self.master_restorer} provides professional restoration services across:
- Brisbane (Hamilton, Ascot, New Farm, and surrounding suburbs)
- Ipswich (Karalee, Brookwater, Springfield Lakes, and surrounding areas)
- Logan (Springwood, Shailer Park, Daisy Hill, and surrounding suburbs)

Our Credentials:
- IICRC Master Restorer (one of a limited number in Brisbane & QLD)
- Hazmat Licensed professional
- Hazmat Licensed (hazardous materials handling)
- Asbestos Assessor (safe identification and management)

Next Steps:
1. Call {self.emergency_contact} for immediate quote
2. Provide property location and damage details
3. We'll schedule an assessment at your convenience

Contact: {self.emergency_contact}
Hours: 24/7 Emergency Service Available
"""
        return message.strip()


def test_emergency_router():
    """Test the emergency router with sample scenarios"""
    from intent_classifier import DisasterRecoveryIntentClassifier

    classifier = DisasterRecoveryIntentClassifier()
    router = DisasterRecoveryEmergencyRouter()

    test_scenarios = [
        ("My house is flooding in Hamilton!", "Hamilton"),
        ("Fire damage at commercial property in Ipswich", "Ipswich"),
        ("Mould throughout home in Springwood", "Springwood"),
        ("Do you service Logan area?", "Logan"),
        ("Sewage backup emergency", None),
        ("Need quote for water damage restoration", "Brisbane")
    ]

    print("=== Disaster Recovery Emergency Router Tests ===\n")

    for user_input, location in test_scenarios:
        classification = classifier.classify(user_input)
        route = router.route(classification, location)

        print(f"Input: {user_input}")
        print(f"Location: {location or 'Not specified'}")
        print(f"Service Type: {classification.service_type.value}")
        print(f"Emergency Level: {classification.emergency_level.name}")
        print(f"Escalate: {'YES' if route.escalate else 'NO'}")
        print(f"Route To: {route.route_to}")
        print(f"Priority: {route.priority}")
        print(f"Response Time: {route.response_time}")
        print(f"\nMessage Preview:")
        print(route.message[:300] + "..." if len(route.message) > 300 else route.message)
        print("=" * 80)
        print()


if __name__ == "__main__":
    test_emergency_router()
