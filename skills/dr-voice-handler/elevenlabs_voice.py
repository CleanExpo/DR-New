"""
ElevenLabs Voice API Integration for Disaster Recovery Bot

Provides professional voice synthesis for emergency response messaging.
Voice: Professional male Australian accent (45-year-old trades professional)
Business: Phill McGurk - IICRC Master Restorer

NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
"""

import os
import json
import logging
from typing import Optional, Dict, Any, Generator
from dataclasses import dataclass
from enum import Enum

try:
    import requests
except ImportError:
    requests = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class VoiceModel(Enum):
    """ElevenLabs voice models"""
    ELEVEN_MULTILINGUAL_V2 = "eleven_multilingual_v2"
    ELEVEN_TURBO_V2 = "eleven_turbo_v2"
    ELEVEN_MONOLINGUAL_V1 = "eleven_monolingual_v1"


@dataclass
class VoiceSettings:
    """Voice synthesis settings"""
    stability: float = 0.75  # 0.0 to 1.0 (higher = more stable/consistent)
    similarity_boost: float = 0.85  # 0.0 to 1.0 (higher = closer to original voice)
    style: float = 0.5  # 0.0 to 1.0 (style exaggeration)
    use_speaker_boost: bool = True  # Enhance speaker clarity


@dataclass
class AudioConfig:
    """Audio output configuration"""
    optimize_streaming_latency: int = 3  # 0-4 (higher = lower latency, lower quality)
    output_format: str = "mp3_44100_128"  # mp3_44100_128, pcm_16000, etc.


class DisasterRecoveryVoiceSynthesizer:
    """
    ElevenLabs voice synthesizer for Disaster Recovery bot

    Provides professional Australian voice for emergency response messaging.
    Voice: 45-year-old male trades professional with Australian accent
    """

    # ElevenLabs API configuration
    API_BASE_URL = "https://api.elevenlabs.io/v1"

    # Voice IDs - Professional Australian male voices
    # Note: These are example IDs. You'll need to select from ElevenLabs voice library
    AUSTRALIAN_VOICE_IDS = {
        "professional_male": "21m00Tcm4TlvDq8ikWAM",  # Example: Adam (professional)
        "mature_australian": "pNInz6obpgDQGcFmaJgB",  # Example: Australian accent
        "emergency_narrator": "EXAVITQu4vr4xnSDxMaL"  # Example: Clear, authoritative
    }

    def __init__(
        self,
        api_key: Optional[str] = None,
        voice_id: Optional[str] = None,
        voice_settings: Optional[VoiceSettings] = None,
        audio_config: Optional[AudioConfig] = None
    ):
        """
        Initialize ElevenLabs voice synthesizer

        Args:
            api_key: ElevenLabs API key (or set ELEVENLABS_API_KEY env var)
            voice_id: Voice ID to use (defaults to professional Australian male)
            voice_settings: Voice synthesis settings
            audio_config: Audio output configuration
        """
        # Get API key from parameter or environment
        self.api_key = api_key or os.getenv("ELEVENLABS_API_KEY")
        if not self.api_key:
            logger.warning(
                "ElevenLabs API key not provided. Set ELEVENLABS_API_KEY environment variable "
                "or pass api_key parameter."
            )

        # Set voice ID (default to professional male)
        self.voice_id = voice_id or self.AUSTRALIAN_VOICE_IDS["professional_male"]

        # Set voice settings
        self.voice_settings = voice_settings or VoiceSettings()

        # Set audio configuration
        self.audio_config = audio_config or AudioConfig()

        # Check if requests library is available
        if requests is None:
            logger.error("requests library not installed. Install with: pip install requests")

        logger.info(f"ElevenLabs Voice Synthesizer initialized with voice ID: {self.voice_id}")

    def synthesize(
        self,
        text: str,
        voice_id: Optional[str] = None,
        stream: bool = False
    ) -> Optional[bytes]:
        """
        Synthesize text to speech

        Args:
            text: Text to convert to speech
            voice_id: Override default voice ID
            stream: Whether to return streaming audio

        Returns:
            Audio bytes (MP3 format) or None if error
        """
        if not self.api_key:
            logger.error("Cannot synthesize: No API key provided")
            return None

        if requests is None:
            logger.error("Cannot synthesize: requests library not installed")
            return None

        # Use provided voice_id or default
        voice = voice_id or self.voice_id

        # Build API endpoint
        endpoint = f"{self.API_BASE_URL}/text-to-speech/{voice}"
        if stream:
            endpoint += "/stream"

        # Build request headers
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": self.api_key
        }

        # Build request payload
        payload = {
            "text": text,
            "model_id": VoiceModel.ELEVEN_MULTILINGUAL_V2.value,
            "voice_settings": {
                "stability": self.voice_settings.stability,
                "similarity_boost": self.voice_settings.similarity_boost,
                "style": self.voice_settings.style,
                "use_speaker_boost": self.voice_settings.use_speaker_boost
            }
        }

        try:
            logger.info(f"Synthesizing text ({len(text)} chars) with voice {voice}")

            # Make API request
            response = requests.post(
                endpoint,
                json=payload,
                headers=headers,
                timeout=30
            )

            # Check response
            if response.status_code == 200:
                logger.info("Synthesis successful")
                return response.content
            else:
                logger.error(
                    f"Synthesis failed: {response.status_code} - {response.text}"
                )
                return None

        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {e}")
            return None

    def synthesize_stream(
        self,
        text: str,
        voice_id: Optional[str] = None
    ) -> Optional[Generator[bytes, None, None]]:
        """
        Synthesize text to speech with streaming

        Args:
            text: Text to convert to speech
            voice_id: Override default voice ID

        Yields:
            Audio chunks as they're generated
        """
        if not self.api_key:
            logger.error("Cannot synthesize: No API key provided")
            return None

        if requests is None:
            logger.error("Cannot synthesize: requests library not installed")
            return None

        # Use provided voice_id or default
        voice = voice_id or self.voice_id

        # Build API endpoint
        endpoint = f"{self.API_BASE_URL}/text-to-speech/{voice}/stream"

        # Build request headers
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": self.api_key
        }

        # Build request payload
        payload = {
            "text": text,
            "model_id": VoiceModel.ELEVEN_TURBO_V2.value,  # Use turbo for streaming
            "voice_settings": {
                "stability": self.voice_settings.stability,
                "similarity_boost": self.voice_settings.similarity_boost,
                "style": self.voice_settings.style,
                "use_speaker_boost": self.voice_settings.use_speaker_boost
            },
            "optimize_streaming_latency": self.audio_config.optimize_streaming_latency
        }

        try:
            logger.info(f"Starting streaming synthesis ({len(text)} chars)")

            # Make streaming API request
            response = requests.post(
                endpoint,
                json=payload,
                headers=headers,
                stream=True,
                timeout=30
            )

            # Check response
            if response.status_code == 200:
                # Yield audio chunks
                for chunk in response.iter_content(chunk_size=1024):
                    if chunk:
                        yield chunk
                logger.info("Streaming synthesis complete")
            else:
                logger.error(
                    f"Streaming synthesis failed: {response.status_code} - {response.text}"
                )
                return None

        except requests.exceptions.RequestException as e:
            logger.error(f"Streaming API request failed: {e}")
            return None

    def get_available_voices(self) -> Optional[Dict[str, Any]]:
        """
        Get list of available voices from ElevenLabs

        Returns:
            Dictionary of available voices or None if error
        """
        if not self.api_key:
            logger.error("Cannot get voices: No API key provided")
            return None

        if requests is None:
            logger.error("Cannot get voices: requests library not installed")
            return None

        endpoint = f"{self.API_BASE_URL}/voices"

        headers = {
            "Accept": "application/json",
            "xi-api-key": self.api_key
        }

        try:
            response = requests.get(endpoint, headers=headers, timeout=10)

            if response.status_code == 200:
                voices_data = response.json()
                logger.info(f"Retrieved {len(voices_data.get('voices', []))} voices")
                return voices_data
            else:
                logger.error(f"Failed to get voices: {response.status_code}")
                return None

        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {e}")
            return None

    def save_audio(self, audio_bytes: bytes, filename: str) -> bool:
        """
        Save audio bytes to file

        Args:
            audio_bytes: Audio data
            filename: Output filename (should end in .mp3)

        Returns:
            True if saved successfully, False otherwise
        """
        try:
            with open(filename, "wb") as f:
                f.write(audio_bytes)
            logger.info(f"Audio saved to {filename}")
            return True
        except IOError as e:
            logger.error(f"Failed to save audio: {e}")
            return False


def test_voice_synthesis():
    """Test ElevenLabs voice synthesis"""
    print("=" * 80)
    print("ELEVENLABS VOICE SYNTHESIS TEST")
    print("Disaster Recovery & NRPG Bot")
    print("=" * 80)
    print()

    # Initialize synthesizer
    synthesizer = DisasterRecoveryVoiceSynthesizer()

    # Check if API key is set
    if not synthesizer.api_key:
        print("⚠️  No API key set!")
        print()
        print("To use ElevenLabs voice synthesis:")
        print("1. Sign up at https://elevenlabs.io")
        print("2. Get your API key from the dashboard")
        print("3. Set environment variable:")
        print("   Windows: set ELEVENLABS_API_KEY=your_key_here")
        print("   Linux/Mac: export ELEVENLABS_API_KEY=your_key_here")
        print()
        print("Or pass api_key parameter to DisasterRecoveryVoiceSynthesizer()")
        print()
        print("=" * 80)
        return

    # Test messages
    test_messages = [
        "Emergency water damage response. Phill McGurk, IICRC Master Restorer, will dispatch our team immediately.",
        "Thank you for contacting Disaster Recovery Brisbane. How can we help you today?",
        "We service Brisbane, Ipswich, and Logan areas. Our team is available 24/7 for emergencies."
    ]

    print("Testing voice synthesis...")
    print()

    for i, message in enumerate(test_messages, 1):
        print(f"Test {i}: {message[:60]}...")

        # Synthesize
        audio = synthesizer.synthesize(message)

        if audio:
            filename = f"test_voice_{i}.mp3"
            if synthesizer.save_audio(audio, filename):
                print(f"✅ Saved to {filename}")
        else:
            print("❌ Synthesis failed")

        print()

    print("=" * 80)
    print("Test complete!")
    print()
    print("Available voice IDs for Australian accent:")
    for name, voice_id in synthesizer.AUSTRALIAN_VOICE_IDS.items():
        print(f"  - {name}: {voice_id}")
    print()
    print("To use a specific voice:")
    print("  synthesizer = DisasterRecoveryVoiceSynthesizer(voice_id='...')")
    print("=" * 80)


if __name__ == "__main__":
    test_voice_synthesis()
