"""
Disaster Recovery Voice Handler
Voice interaction handler for Phill McGurk's Disaster Recovery emergency bot

Project: Disaster Recovery Brisbane/Ipswich/Logan & NRPG
Business: Phill McGurk - IICRC Master Restorer
Author: Disaster Recovery & NRPG Team
Version: 1.0.0
Created: 2025-11-05
"""

import json
import logging
from typing import Dict, Any, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DisasterRecoveryVoiceHandler:
    """
    Voice handler for Disaster Recovery emergency bot
    Processes voice commands and routes emergency requests for Phill McGurk's services
    Service Areas: Brisbane, Ipswich, Logan
    """

    def __init__(self, config: Optional[Dict[str, Any]] = None):
        """
        Initialise the voice handler

        Args:
            config: Optional configuration dictionary
        """
        self.config = config or {}
        self.emergency_keywords = [
            'flood', 'flooding', 'water damage', 'fire', 'smoke',
            'mould', 'mold', 'sewage', 'storm', 'emergency'
        ]
        logger.info("Disaster Recovery Voice Handler initialised")

    def process_voice_input(self, audio_input: str) -> Dict[str, Any]:
        """
        Process voice input and determine intent

        Args:
            audio_input: Transcribed voice input text

        Returns:
            Dictionary with intent, confidence, and action
        """
        audio_lower = audio_input.lower()

        # Check for emergency keywords
        is_emergency = any(keyword in audio_lower for keyword in self.emergency_keywords)

        response = {
            'input': audio_input,
            'is_emergency': is_emergency,
            'intent': self._determine_intent(audio_lower),
            'confidence': 0.85,  # Placeholder - would use ML model
            'recommended_action': None
        }

        # Set recommended action
        if is_emergency:
            response['recommended_action'] = 'route_to_emergency_team'

        return response

    def _determine_intent(self, text: str) -> str:
        """
        Determine user intent from text

        Args:
            text: Lowercase text input

        Returns:
            Intent classification
        """
        if any(word in text for word in ['flood', 'flooding', 'water']):
            return 'water_damage_emergency'
        elif any(word in text for word in ['fire', 'smoke']):
            return 'fire_damage_emergency'
        elif any(word in text for word in ['mould', 'mold']):
            return 'mould_remediation'
        elif any(word in text for word in ['quote', 'price', 'cost']):
            return 'quote_request'
        elif any(word in text for word in ['book', 'schedule', 'appointment']):
            return 'booking_request'
        else:
            return 'general_enquiry'

    def generate_response(self, intent: str) -> str:
        """
        Generate appropriate voice response based on intent

        Args:
            intent: Classified intent

        Returns:
            Response text to be spoken
        """
        responses = {
            'water_damage_emergency': "I understand you have a water damage emergency. I'm connecting you to our emergency response team immediately. Please stay on the line.",
            'fire_damage_emergency': "I understand you have fire damage. Our emergency team is standing by. Connecting you now.",
            'mould_remediation': "I can help with mould remediation. Let me connect you to our mould specialists.",
            'quote_request': "I'd be happy to help with a quote. Let me gather some information from you.",
            'booking_request': "I can help schedule an appointment. Let me check our availability.",
            'general_enquiry': "How can I help you today with your disaster recovery needs?"
        }

        return responses.get(intent, responses['general_enquiry'])


def main():
    """Main function for testing"""
    handler = DisasterRecoveryVoiceHandler()

    # Test cases
    test_inputs = [
        "I have flooding in my house",
        "Need help with fire damage",
        "How much does mould removal cost?"
    ]

    for test_input in test_inputs:
        print(f"\nInput: {test_input}")
        result = handler.process_voice_input(test_input)
        print(f"Intent: {result['intent']}")
        print(f"Emergency: {result['is_emergency']}")
        response = handler.generate_response(result['intent'])
        print(f"Response: {response}")


if __name__ == "__main__":
    main()
