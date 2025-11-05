"""
Voice Configuration for Disaster Recovery Bot

Centralized voice settings and ElevenLabs voice selection.
Business: Phill McGurk - IICRC Master Restorer

NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
"""

import os
from typing import Dict, Optional
from dataclasses import dataclass


@dataclass
class VoiceProfile:
    """Voice profile configuration"""
    voice_id: str
    name: str
    description: str
    accent: str
    age: str
    gender: str
    use_case: str


class DisasterRecoveryVoiceConfig:
    """
    Voice configuration for Disaster Recovery bot

    Provides recommended ElevenLabs voice profiles for:
    - Emergency response (urgent, authoritative)
    - Standard inquiries (professional, friendly)
    - Information delivery (clear, informative)
    """

    # Recommended voice profiles for disaster recovery messaging
    # Note: These are example IDs - select actual voices from ElevenLabs voice library
    VOICE_PROFILES: Dict[str, VoiceProfile] = {
        # Emergency Response Voice
        "emergency": VoiceProfile(
            voice_id="21m00Tcm4TlvDq8ikWAM",  # Example: Adam
            name="Emergency Response",
            description="Professional, authoritative, reassuring for emergency situations",
            accent="Australian",
            age="45-50",
            gender="Male",
            use_case="CRITICAL/URGENT emergency calls, 24/7 response messaging"
        ),

        # Standard Professional Voice
        "professional": VoiceProfile(
            voice_id="pNInz6obpgDQGcFmaJgB",  # Example: Adam (Australian variant)
            name="Professional Service",
            description="Mature professional trades voice, Australian accent",
            accent="Australian",
            age="40-50",
            gender="Male",
            use_case="Standard inquiries, quotes, scheduling"
        ),

        # Information Delivery Voice
        "informative": VoiceProfile(
            voice_id="EXAVITQu4vr4xnSDxMaL",  # Example: Sarah
            name="Information Delivery",
            description="Clear, articulate, educational tone",
            accent="Australian",
            age="35-45",
            gender="Male",
            use_case="Service explanations, credentials, process descriptions"
        ),
    }

    # Default voice for Disaster Recovery bot
    DEFAULT_VOICE = "emergency"

    @classmethod
    def get_voice_for_context(cls, emergency_level: str) -> VoiceProfile:
        """
        Get appropriate voice based on emergency level

        Args:
            emergency_level: CRITICAL, URGENT, HIGH, STANDARD, or INQUIRY

        Returns:
            VoiceProfile for the context
        """
        if emergency_level in ["CRITICAL", "URGENT"]:
            return cls.VOICE_PROFILES["emergency"]
        elif emergency_level == "HIGH":
            return cls.VOICE_PROFILES["professional"]
        else:
            return cls.VOICE_PROFILES["informative"]

    @classmethod
    def get_voice_id_from_env(cls) -> Optional[str]:
        """
        Get voice ID from environment variable

        Returns:
            Voice ID from ELEVENLABS_VOICE_ID env var or None
        """
        return os.getenv("ELEVENLABS_VOICE_ID")

    @classmethod
    def get_api_key_from_env(cls) -> Optional[str]:
        """
        Get API key from environment variable

        Returns:
            API key from ELEVENLABS_API_KEY env var or None
        """
        return os.getenv("ELEVENLABS_API_KEY")

    @classmethod
    def get_voice_settings_from_env(cls) -> Dict[str, float]:
        """
        Get voice settings from environment variables

        Returns:
            Dictionary with stability, similarity_boost, style
        """
        return {
            "stability": float(os.getenv("VOICE_STABILITY", "0.75")),
            "similarity_boost": float(os.getenv("VOICE_SIMILARITY_BOOST", "0.85")),
            "style": float(os.getenv("VOICE_STYLE", "0.5")),
            "use_speaker_boost": os.getenv("VOICE_SPEAKER_BOOST", "true").lower() == "true"
        }

    @classmethod
    def print_voice_guide(cls):
        """Print guide for selecting ElevenLabs voices"""
        print("=" * 80)
        print("DISASTER RECOVERY BOT - VOICE SELECTION GUIDE")
        print("=" * 80)
        print()
        print("Recommended voice characteristics for Phill McGurk's business:")
        print()
        print("🎙️  VOICE PROFILE:")
        print("   - Age: 45-50 years old")
        print("   - Gender: Male")
        print("   - Accent: Australian")
        print("   - Tone: Professional trades/construction background")
        print("   - Qualities: Authoritative, reassuring, experienced")
        print()
        print("📋 USE CASES:")
        print()

        for profile_name, profile in cls.VOICE_PROFILES.items():
            print(f"   {profile.name.upper()}")
            print(f"   Voice ID: {profile.voice_id}")
            print(f"   Description: {profile.description}")
            print(f"   Use Case: {profile.use_case}")
            print()

        print("🔧 SETUP INSTRUCTIONS:")
        print()
        print("1. Visit https://elevenlabs.io/app/voice-library")
        print("2. Filter by:")
        print("   - Accent: Australian")
        print("   - Gender: Male")
        print("   - Age: Middle-aged (40-55)")
        print("   - Use case: Professional/Conversational")
        print()
        print("3. Preview voices and select one that matches:")
        print("   - Professional trades/construction worker tone")
        print("   - Authoritative but reassuring")
        print("   - Clear Australian accent")
        print()
        print("4. Copy the Voice ID and set environment variable:")
        print("   Windows: set ELEVENLABS_VOICE_ID=your_voice_id")
        print("   Linux/Mac: export ELEVENLABS_VOICE_ID=your_voice_id")
        print()
        print("5. Recommended voice settings:")
        print("   - Stability: 0.75 (consistent for emergency messaging)")
        print("   - Similarity Boost: 0.85 (maintain Australian accent)")
        print("   - Style: 0.5 (natural conversational tone)")
        print("   - Speaker Boost: true (clarity for phone playback)")
        print()
        print("=" * 80)


def test_voice_config():
    """Test voice configuration"""
    print("=" * 80)
    print("VOICE CONFIGURATION TEST")
    print("=" * 80)
    print()

    config = DisasterRecoveryVoiceConfig()

    # Test voice selection by emergency level
    test_levels = ["CRITICAL", "URGENT", "HIGH", "STANDARD", "INQUIRY"]

    print("Voice Selection by Emergency Level:")
    print()

    for level in test_levels:
        voice = config.get_voice_for_context(level)
        print(f"{level:10s} → {voice.name:25s} (ID: {voice.voice_id})")

    print()
    print("=" * 80)
    print()

    # Print voice guide
    config.print_voice_guide()


if __name__ == "__main__":
    test_voice_config()
