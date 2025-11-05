"""
Disaster Recovery Voice Handler
Voice interaction handler for Phill McGurk's Disaster Recovery emergency bot

Project: Disaster Recovery Brisbane/Ipswich/Logan & NRPG
Business: Phill McGurk - IICRC Master Restorer
Author: Disaster Recovery & NRPG Team
Version: 2.0.0
Created: 2025-11-05
Updated: 2025-11-05 - Integrated intent classifier, emergency router, service area validator
"""

import json
import logging
from typing import Dict, Any, Optional

# Import bot components
from intent_classifier import DisasterRecoveryIntentClassifier
from emergency_router import DisasterRecoveryEmergencyRouter
from service_area_validator import DisasterRecoveryServiceAreaValidator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DisasterRecoveryVoiceHandler:
    """
    Voice handler for Disaster Recovery emergency bot
    Processes voice commands and routes emergency requests for Phill McGurk's services

    Service Areas: Brisbane, Ipswich, Logan
    Emergency Contact: 1300 309 361
    Business: Phill McGurk - IICRC Master Restorer

    Components:
    - Intent Classifier: Identifies service type and emergency level
    - Emergency Router: Routes calls based on severity
    - Service Area Validator: Validates location coverage
    """

    def __init__(self, config: Optional[Dict[str, Any]] = None):
        """
        Initialise the voice handler with all bot components

        Args:
            config: Optional configuration dictionary
        """
        self.config = config or {}

        # Initialize bot components
        self.intent_classifier = DisasterRecoveryIntentClassifier()
        self.emergency_router = DisasterRecoveryEmergencyRouter()
        self.service_area_validator = DisasterRecoveryServiceAreaValidator()

        logger.info("Disaster Recovery Voice Handler v2.0 initialised with all components")

    def process_voice_input(
        self,
        audio_input: str,
        location: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Process voice input through complete bot pipeline

        Args:
            audio_input: Transcribed voice input text
            location: Optional customer location (suburb)

        Returns:
            Dictionary with classification, routing, and response
        """
        logger.info(f"Processing input: {audio_input[:50]}...")

        # Step 1: Classify intent
        classification = self.intent_classifier.classify(audio_input)

        # Step 2: Validate service area (if location provided)
        area_validation = None
        if location:
            area_validation = self.service_area_validator.validate(location)
            logger.info(f"Location validation: {area_validation.region.value}")

        # Step 3: Route emergency
        routing = self.emergency_router.route(classification, location)

        # Build response
        response = {
            'input': audio_input,
            'location': location,
            'classification': {
                'service_type': classification.service_type.value,
                'emergency_level': classification.emergency_level.name,
                'confidence': classification.confidence,
                'keywords_matched': classification.keywords_matched
            },
            'routing': {
                'route_to': routing.route_to,
                'priority': routing.priority,
                'response_time': routing.response_time,
                'escalate': routing.escalate,
                'contact_method': routing.contact_method
            },
            'area_validation': {
                'is_serviced': area_validation.is_serviced if area_validation else None,
                'region': area_validation.region.value if area_validation else None,
                'suburb': area_validation.suburb if area_validation else None
            } if area_validation else None,
            'suggested_response': routing.message,
            'fallback_response': classification.suggested_response
        }

        logger.info(f"Routing decision: {routing.route_to} (Priority: {routing.priority})")

        return response

    def generate_voice_response(self, processing_result: Dict[str, Any]) -> str:
        """
        Generate voice response from processing result

        Args:
            processing_result: Result from process_voice_input

        Returns:
            Voice response text
        """
        return processing_result['suggested_response']

    def handle_conversation(
        self,
        user_input: str,
        location: Optional[str] = None
    ) -> str:
        """
        Handle complete conversation interaction

        Args:
            user_input: Customer's message
            location: Optional location

        Returns:
            Bot response message
        """
        # Process input through pipeline
        result = self.process_voice_input(user_input, location)

        # Check if location needs validation
        if not location and result['routing']['escalate']:
            return (
                result['suggested_response'] +
                "\n\nBefore we connect you, could you please provide your suburb location? "
                "This helps us dispatch the right team immediately."
            )

        # Check if outside service area
        if result['area_validation'] and not result['area_validation']['is_serviced']:
            return result['area_validation'].get('message', result['suggested_response'])

        # Return main response
        return result['suggested_response']


def main():
    """Main function for testing integrated bot"""
    print("=" * 80)
    print("DISASTER RECOVERY & NRPG BOT - INTEGRATED SYSTEM TEST")
    print("Phill McGurk - IICRC Master Restorer")
    print("Service Areas: Brisbane, Ipswich, Logan")
    print("Emergency: 1300 309 361")
    print("=" * 80)
    print()

    handler = DisasterRecoveryVoiceHandler()

    # Test scenarios with location
    test_scenarios = [
        ("My house is flooding in Hamilton!", "Hamilton"),
        ("Fire damage at commercial property in Ipswich", "Ipswich"),
        ("Mould throughout home in Springwood", "Springwood"),
        ("Do you service Logan area?", "Logan"),
        ("Sewage backup emergency", "Ascot"),
        ("Need quote for water damage restoration", "Sydney"),
        ("Storm damage to roof", "Karalee")
    ]

    for user_input, location in test_scenarios:
        print("-" * 80)
        print(f"USER INPUT: {user_input}")
        print(f"LOCATION: {location}")
        print()

        # Process through complete pipeline
        result = handler.process_voice_input(user_input, location)

        print(f"SERVICE TYPE: {result['classification']['service_type']}")
        print(f"EMERGENCY LEVEL: {result['classification']['emergency_level']}")
        print(f"CONFIDENCE: {result['classification']['confidence']}")
        print(f"ROUTE TO: {result['routing']['route_to']}")
        print(f"PRIORITY: {result['routing']['priority']}")
        print(f"ESCALATE: {'YES' if result['routing']['escalate'] else 'NO'}")

        if result['area_validation']:
            print(f"AREA SERVICED: {'YES' if result['area_validation']['is_serviced'] else 'NO'}")
            print(f"REGION: {result['area_validation']['region']}")

        print()
        print("BOT RESPONSE:")
        print(handler.generate_voice_response(result))
        print()

    print("=" * 80)
    print("INTEGRATION TEST COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
