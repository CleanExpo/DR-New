"""
Intent Classifier for Disaster Recovery & NRPG Bot

Classifies customer inquiries into service types and emergency categories.
Service Areas: Brisbane, Ipswich, Logan
Business: Phill McGurk - IICRC Master Restorer

NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
"""

from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum


class ServiceType(Enum):
    """Service types offered by Disaster Recovery"""
    WATER_DAMAGE = "water_damage"
    FIRE_DAMAGE = "fire_damage"
    MOULD_REMEDIATION = "mould_remediation"
    STORM_DAMAGE = "storm_damage"
    BIOHAZARD = "biohazard"
    SEWAGE_CLEANUP = "sewage_cleanup"
    TRAUMA_CLEANING = "trauma_cleaning"
    COMMERCIAL = "commercial"
    GENERAL_INQUIRY = "general_inquiry"


class EmergencyLevel(Enum):
    """Emergency severity levels"""
    CRITICAL = 10  # Immediate response required
    URGENT = 7     # Same day response required
    HIGH = 5       # 24-48 hour response
    STANDARD = 3   # Normal scheduling
    INQUIRY = 1    # Information only


@dataclass
class IntentClassification:
    """Result of intent classification"""
    service_type: ServiceType
    emergency_level: EmergencyLevel
    confidence: float
    keywords_matched: List[str]
    suggested_response: str


class DisasterRecoveryIntentClassifier:
    """
    Intent classifier for Disaster Recovery emergency bot

    Processes customer inquiries and classifies them into:
    - Service type (water, fire, mould, etc.)
    - Emergency level (critical to inquiry)
    - Confidence score (0.0 to 1.0)
    """

    def __init__(self):
        # Emergency keywords by service type
        self.service_keywords = {
            ServiceType.WATER_DAMAGE: [
                'flood', 'flooding', 'water damage', 'burst pipe', 'leak', 'leaking',
                'wet', 'soaked', 'saturated', 'water through ceiling', 'water on floor',
                'rising water', 'water everywhere', 'wet carpet', 'wet walls'
            ],
            ServiceType.FIRE_DAMAGE: [
                'fire', 'smoke', 'smoke damage', 'fire damage', 'burnt', 'burning',
                'soot', 'ash', 'charred', 'flames', 'blaze', 'house fire', 'kitchen fire'
            ],
            ServiceType.MOULD_REMEDIATION: [
                'mould', 'mold', 'mildew', 'fungus', 'musty smell', 'black spots',
                'fuzzy growth', 'damp smell', 'moisture problem', 'condensation'
            ],
            ServiceType.STORM_DAMAGE: [
                'storm', 'storm damage', 'hail', 'wind damage', 'tree fell', 'roof damage',
                'debris', 'cyclone', 'severe weather', 'tornado', 'structural damage'
            ],
            ServiceType.BIOHAZARD: [
                'biohazard', 'bio hazard', 'contamination', 'bodily fluids', 'blood',
                'crime scene', 'death', 'hazardous materials', 'chemical spill'
            ],
            ServiceType.SEWAGE_CLEANUP: [
                'sewage', 'sewer', 'waste water', 'toilet overflow', 'septic',
                'contaminated water', 'brown water', 'foul smell', 'sewerage'
            ],
            ServiceType.TRAUMA_CLEANING: [
                'trauma', 'crime scene', 'death cleanup', 'suicide cleanup',
                'unattended death', 'trauma scene', 'biohazard cleanup'
            ],
            ServiceType.COMMERCIAL: [
                'commercial', 'business', 'office', 'warehouse', 'shop', 'store',
                'industrial', 'factory', 'restaurant', 'hotel', 'shopping centre'
            ],
            ServiceType.GENERAL_INQUIRY: [
                'quote', 'cost', 'price', 'how much', 'insurance', 'information',
                'do you service', 'what areas', 'business hours', 'contact'
            ]
        }

        # Emergency urgency indicators
        self.urgency_keywords = {
            EmergencyLevel.CRITICAL: [
                'emergency', 'urgent', 'now', 'immediately', 'help', 'asap',
                'flooding now', 'fire now', 'active', 'ongoing', 'getting worse',
                'spreading', 'can\'t stop', 'still flooding', 'right now'
            ],
            EmergencyLevel.URGENT: [
                'today', 'same day', 'this morning', 'this afternoon', 'tonight',
                'happened today', 'just happened', 'recently', 'few hours ago'
            ],
            EmergencyLevel.HIGH: [
                'soon', 'this week', 'couple days', 'few days', 'happened yesterday',
                'last night', 'weekend', 'need help', 'concerned'
            ],
            EmergencyLevel.STANDARD: [
                'next week', 'when available', 'schedule', 'appointment', 'planning',
                'preventative', 'maintenance', 'assessment'
            ]
        }

        # Australian spelling variations
        self.aussie_variations = {
            'mold': 'mould',
            'color': 'colour',
            'odor': 'odour',
            'vapor': 'vapour',
            'center': 'centre'
        }

    def classify(self, user_input: str) -> IntentClassification:
        """
        Classify user input into service type and emergency level

        Args:
            user_input: Customer's message/inquiry

        Returns:
            IntentClassification with service type, emergency level, confidence
        """
        # Normalize input
        normalized_input = self._normalize_input(user_input)

        # Detect service type
        service_type, service_confidence, service_keywords = self._detect_service_type(normalized_input)

        # Detect emergency level
        emergency_level, urgency_keywords = self._detect_emergency_level(normalized_input, service_type)

        # Calculate overall confidence
        confidence = self._calculate_confidence(service_confidence, len(service_keywords))

        # Generate suggested response
        suggested_response = self._generate_response(service_type, emergency_level)

        return IntentClassification(
            service_type=service_type,
            emergency_level=emergency_level,
            confidence=confidence,
            keywords_matched=service_keywords + urgency_keywords,
            suggested_response=suggested_response
        )

    def _normalize_input(self, text: str) -> str:
        """Normalize input with Australian spelling"""
        text = text.lower().strip()

        # Apply Australian spelling variations
        for us_spelling, au_spelling in self.aussie_variations.items():
            text = text.replace(us_spelling, au_spelling)

        return text

    def _detect_service_type(self, text: str) -> Tuple[ServiceType, float, List[str]]:
        """Detect service type from text"""
        matches: Dict[ServiceType, List[str]] = {
            service_type: [] for service_type in ServiceType
        }

        # Find keyword matches for each service type
        for service_type, keywords in self.service_keywords.items():
            for keyword in keywords:
                if keyword in text:
                    matches[service_type].append(keyword)

        # Find service type with most matches
        best_match = max(matches.items(), key=lambda x: len(x[1]))
        service_type = best_match[0]
        matched_keywords = best_match[1]

        # If no matches, default to general inquiry
        if not matched_keywords:
            return ServiceType.GENERAL_INQUIRY, 0.5, []

        # Calculate confidence based on number of matches
        confidence = min(1.0, len(matched_keywords) * 0.3 + 0.4)

        return service_type, confidence, matched_keywords

    def _detect_emergency_level(
        self,
        text: str,
        service_type: ServiceType
    ) -> Tuple[EmergencyLevel, List[str]]:
        """Detect emergency level from text"""
        urgency_matches: Dict[EmergencyLevel, List[str]] = {
            level: [] for level in EmergencyLevel
        }

        # Find urgency keyword matches
        for level, keywords in self.urgency_keywords.items():
            for keyword in keywords:
                if keyword in text:
                    urgency_matches[level].append(keyword)

        # Find highest urgency level with matches
        for level in [EmergencyLevel.CRITICAL, EmergencyLevel.URGENT,
                     EmergencyLevel.HIGH, EmergencyLevel.STANDARD]:
            if urgency_matches[level]:
                return level, urgency_matches[level]

        # Default based on service type
        if service_type in [ServiceType.FIRE_DAMAGE, ServiceType.BIOHAZARD,
                           ServiceType.SEWAGE_CLEANUP, ServiceType.TRAUMA_CLEANING]:
            return EmergencyLevel.URGENT, []
        elif service_type == ServiceType.WATER_DAMAGE:
            return EmergencyLevel.HIGH, []
        else:
            return EmergencyLevel.STANDARD, []

    def _calculate_confidence(self, service_confidence: float, keyword_count: int) -> float:
        """Calculate overall classification confidence"""
        # Base confidence from service detection
        confidence = service_confidence

        # Boost confidence for multiple keyword matches
        if keyword_count >= 3:
            confidence = min(1.0, confidence + 0.2)
        elif keyword_count >= 2:
            confidence = min(1.0, confidence + 0.1)

        return round(confidence, 2)

    def _generate_response(
        self,
        service_type: ServiceType,
        emergency_level: EmergencyLevel
    ) -> str:
        """Generate suggested response based on classification"""
        if emergency_level.value >= EmergencyLevel.URGENT.value:
            return (
                f"I understand this is an emergency {service_type.value.replace('_', ' ')} situation. "
                f"Let me connect you with our emergency response team immediately. "
                f"Phill McGurk, our IICRC Master Restorer, has teams available 24/7. "
                f"Please call 1300 309 361 for immediate assistance."
            )
        else:
            return (
                f"I can help you with {service_type.value.replace('_', ' ')}. "
                f"Phill McGurk is one of a limited number of Master Restorers in Brisbane & QLD. "
                f"Would you like to provide your location so I can confirm we service your area?"
            )


# Test function
def test_classifier():
    """Test the intent classifier with sample inputs"""
    classifier = DisasterRecoveryIntentClassifier()

    test_cases = [
        "My house is flooding in Hamilton!",
        "Fire damage at commercial property in Ipswich",
        "Mould throughout home in Springwood",
        "Do you service Logan area?",
        "Sewage backup emergency",
        "Storm damage to roof from last night"
    ]

    print("=== Disaster Recovery Intent Classifier Tests ===\n")

    for test_input in test_cases:
        result = classifier.classify(test_input)
        print(f"Input: {test_input}")
        print(f"Service Type: {result.service_type.value}")
        print(f"Emergency Level: {result.emergency_level.name} ({result.emergency_level.value})")
        print(f"Confidence: {result.confidence}")
        print(f"Keywords: {', '.join(result.keywords_matched)}")
        print(f"Response: {result.suggested_response[:100]}...")
        print("-" * 80)
        print()


if __name__ == "__main__":
    test_classifier()
