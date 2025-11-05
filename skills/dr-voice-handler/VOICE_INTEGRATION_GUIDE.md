# ElevenLabs Voice Integration Guide

**Project**: Disaster Recovery & NRPG Bot
**Business**: Phill McGurk - IICRC Master Restorer
**Voice Type**: Professional male Australian accent (45-year-old trades professional)
**Date**: 2025-11-05

---

## Overview

The Disaster Recovery bot now includes professional voice synthesis using ElevenLabs AI voice API. This provides natural, Australian-accented voice responses for emergency calls and customer inquiries.

### Voice Profile Requirements

**Recommended Voice Characteristics**:
- **Age**: 45-50 years old
- **Gender**: Male
- **Accent**: Australian
- **Tone**: Professional trades/construction background
- **Qualities**: Authoritative, reassuring, experienced
- **Use Case**: Emergency response and disaster recovery messaging

---

## Setup Instructions

### Step 1: Get ElevenLabs API Key

1. **Sign Up**:
   - Visit: https://elevenlabs.io
   - Create an account (free tier available)

2. **Get API Key**:
   - Go to: https://elevenlabs.io/app/speech-synthesis
   - Navigate to Profile Settings
   - Copy your API key

3. **Set Environment Variable**:

   **Windows**:
   ```cmd
   set ELEVENLABS_API_KEY=your_api_key_here
   ```

   **Linux/Mac**:
   ```bash
   export ELEVENLABS_API_KEY=your_api_key_here
   ```

   **Permanent (Windows)**:
   ```cmd
   setx ELEVENLABS_API_KEY "your_api_key_here"
   ```

### Step 2: Select Voice

1. **Browse Voice Library**:
   - Visit: https://elevenlabs.io/app/voice-library
   - Filter by:
     - Accent: Australian
     - Gender: Male
     - Age: Middle-aged (40-55)
     - Use case: Professional/Conversational

2. **Test Voices**:
   - Preview voices with sample text:
     ```
     "This is Phill McGurk from Disaster Recovery Brisbane.
     We're here to help with your emergency restoration needs 24/7."
     ```

3. **Select Best Match**:
   - Look for:
     - Clear Australian accent
     - Professional, authoritative tone
     - Mature, reassuring voice
     - Good for phone/emergency communication

4. **Copy Voice ID**:
   - Click on selected voice
   - Copy the Voice ID (format: `21m00Tcm4TlvDq8ikWAM`)

5. **Set Environment Variable**:
   ```cmd
   set ELEVENLABS_VOICE_ID=your_voice_id_here
   ```

### Step 3: Install Dependencies

```bash
cd "D:\DR New\skills\dr-voice-handler"
pip install -r requirements.txt
```

**Required Packages**:
- `requests>=2.31.0` - HTTP requests for API
- `elevenlabs>=0.2.27` - Official ElevenLabs SDK (optional)
- `pydub>=0.25.1` - Audio processing (optional)

### Step 4: Configure Voice Settings

1. **Copy Environment Template**:
   ```bash
   copy .env.example .env
   ```

2. **Edit .env File**:
   ```env
   # ElevenLabs API Configuration
   ELEVENLABS_API_KEY=your_actual_api_key
   ELEVENLABS_VOICE_ID=your_selected_voice_id

   # Voice Settings (recommended for emergency use)
   VOICE_STABILITY=0.75           # Higher = more consistent
   VOICE_SIMILARITY_BOOST=0.85    # Maintain Australian accent
   VOICE_STYLE=0.5                # Natural conversational
   VOICE_SPEAKER_BOOST=true       # Enhance clarity

   # Audio Configuration
   STREAMING_LATENCY=3            # Lower latency for real-time
   AUDIO_OUTPUT_FORMAT=mp3_44100_128
   ```

---

## Usage

### Basic Voice Synthesis

```python
from elevenlabs_voice import DisasterRecoveryVoiceSynthesizer

# Initialize synthesizer
synthesizer = DisasterRecoveryVoiceSynthesizer()

# Synthesize text to speech
text = "Emergency water damage response. Our team will arrive within 60 minutes."
audio_bytes = synthesizer.synthesize(text)

# Save to file
synthesizer.save_audio(audio_bytes, "response.mp3")
```

### Using Voice Config

```python
from voice_config import DisasterRecoveryVoiceConfig

# Get recommended voice for emergency level
voice_profile = DisasterRecoveryVoiceConfig.get_voice_for_context("CRITICAL")

# Use specific voice
synthesizer = DisasterRecoveryVoiceSynthesizer(voice_id=voice_profile.voice_id)
audio = synthesizer.synthesize(text)
```

### Integrated Bot with Voice

```python
from handler import DisasterRecoveryVoiceHandler

# Initialize handler (voice synthesis auto-enabled if API key set)
bot = DisasterRecoveryVoiceHandler()

# Handle conversation with voice output
result = bot.handle_conversation_with_voice(
    user_input="My house is flooding in Hamilton!",
    location="Hamilton",
    save_audio_to="emergency_response.mp3"
)

# Response includes:
# - result['text_response']: Text message
# - result['audio']: Audio bytes (MP3)
# - result['emergency_level']: CRITICAL/URGENT/HIGH/etc
# - result['has_audio']: True if audio generated
```

### Streaming Voice (Real-time)

```python
# For real-time streaming (lower latency)
audio_stream = synthesizer.synthesize_stream(text)

# Stream audio chunks as they're generated
for chunk in audio_stream:
    # Send chunk to audio player / web socket / phone system
    play_audio_chunk(chunk)
```

---

## Voice Profiles

### Emergency Response Voice

**Use For**: CRITICAL and URGENT emergencies

**Characteristics**:
- Authoritative and reassuring
- Clear and direct
- Professional emergency tone

**Example Messages**:
- "Emergency water damage response. Our team will be dispatched immediately."
- "This is a critical biohazard situation. Phill McGurk's hazmat-licensed team is on the way."

### Professional Service Voice

**Use For**: HIGH priority and standard inquiries

**Characteristics**:
- Professional and friendly
- Mature trades experience
- Conversational yet knowledgeable

**Example Messages**:
- "Thank you for contacting Disaster Recovery Brisbane."
- "We service Hamilton, Ascot, and all Brisbane premium suburbs."

### Information Delivery Voice

**Use For**: STANDARD and INQUIRY level

**Characteristics**:
- Clear and articulate
- Educational tone
- Patient and informative

**Example Messages**:
- "Phill McGurk is one of a limited number of IICRC Master Restorers in Brisbane and Queensland."
- "Our service areas include Brisbane, Ipswich, and Logan regions."

---

## API Costs

### ElevenLabs Pricing (as of 2024)

**Free Tier**:
- 10,000 characters/month
- All voices available
- Good for testing

**Starter Plan** ($5/month):
- 30,000 characters/month
- Commercial use allowed
- Sufficient for ~200-300 calls/month

**Creator Plan** ($22/month):
- 100,000 characters/month
- ~700-1000 calls/month

**Pro Plan** ($99/month):
- 500,000 characters/month
- ~3500-5000 calls/month

### Character Usage Estimates

- Emergency response (200 chars): ~50 calls = 10,000 chars
- Standard inquiry (400 chars): ~25 calls = 10,000 chars
- Detailed explanation (800 chars): ~12 calls = 10,000 chars

**Recommendation**: Start with Starter plan ($5/month) for production use

---

## Voice Settings Explained

### Stability (0.0 - 1.0)

**Recommended: 0.75**

- **Low (0.2-0.4)**: More expressive, variable delivery
- **Medium (0.5-0.7)**: Balanced consistency
- **High (0.75-0.9)**: Very consistent, professional

**Use Case**: High stability for emergency response ensures consistent, professional tone

### Similarity Boost (0.0 - 1.0)

**Recommended: 0.85**

- **Low (0.3-0.5)**: More generic voice
- **Medium (0.6-0.8)**: Good voice characteristics
- **High (0.85-0.95)**: Maximum voice authenticity

**Use Case**: High similarity boost maintains strong Australian accent

### Style (0.0 - 1.0)

**Recommended: 0.5**

- **Low (0.0-0.3)**: Neutral, factual delivery
- **Medium (0.4-0.6)**: Natural conversational
- **High (0.7-1.0)**: Exaggerated style

**Use Case**: Medium style for natural, professional conversation

### Speaker Boost

**Recommended: true**

- Enhances speaker clarity
- Improves phone/mobile playback
- Better for noisy environments

**Use Case**: Essential for emergency phone calls

---

## Testing

### Test Voice Synthesis

```bash
cd "D:\DR New\skills\dr-voice-handler"
python elevenlabs_voice.py
```

**Output**:
- Creates `test_voice_1.mp3`, `test_voice_2.mp3`, etc.
- Tests different message types
- Validates API connection

### Test Voice Configuration

```bash
python voice_config.py
```

**Output**:
- Shows voice selection by emergency level
- Displays voice profile guide
- Lists recommended settings

### Test Integrated Bot

```bash
python handler.py
```

**Output**:
- Runs 7 test scenarios
- Shows text responses
- Voice synthesis available if API key set

---

## Troubleshooting

### "No API key provided"

**Solution**:
```cmd
set ELEVENLABS_API_KEY=your_key_here
python handler.py
```

### "requests library not installed"

**Solution**:
```bash
pip install requests
```

### "Voice synthesis not available"

**Possible Causes**:
1. API key not set
2. Invalid API key
3. Network connectivity issue
4. ElevenLabs API down

**Debug**:
```python
import os
print(os.getenv("ELEVENLABS_API_KEY"))  # Should show your key
```

### "Synthesis failed: 401"

**Cause**: Invalid API key

**Solution**:
- Verify API key at https://elevenlabs.io/app/speech-synthesis
- Ensure no extra spaces in environment variable

### "Synthesis failed: 429"

**Cause**: Rate limit exceeded

**Solution**:
- Upgrade ElevenLabs plan
- Reduce synthesis frequency
- Cache commonly used responses

---

## Best Practices

### 1. Cache Common Responses

Pre-generate voice responses for common messages:

```python
# Cache emergency response audio
common_responses = {
    "emergency_water": "Emergency water damage response...",
    "emergency_fire": "Emergency fire damage response...",
    # etc.
}

# Pre-generate and cache
audio_cache = {}
for key, text in common_responses.items():
    audio = synthesizer.synthesize(text)
    audio_cache[key] = audio
```

### 2. Use Appropriate Voice for Context

```python
# Match voice to emergency level
emergency_level = result['emergency_level']
voice = voice_config.get_voice_for_context(emergency_level)
audio = synthesizer.synthesize(text, voice_id=voice.voice_id)
```

### 3. Save API Costs

```python
# Only synthesize when needed
if customer_prefers_voice:
    audio = bot.synthesize_voice_response(text)
else:
    # Just send text
    send_sms(text)
```

### 4. Monitor Usage

```python
# Track character usage
character_count = len(text)
monthly_usage += character_count

if monthly_usage > character_limit:
    logger.warning("Approaching API limit")
```

---

## Integration with Frontend

### Web Integration (HTML5 Audio)

```html
<!-- Play synthesized audio in browser -->
<audio id="voiceResponse" controls>
    <source src="data:audio/mp3;base64,{audio_base64}" type="audio/mpeg">
</audio>

<script>
// Auto-play when audio ready
document.getElementById('voiceResponse').play();
</script>
```

### Phone System Integration

```python
# Stream to phone system
audio_stream = synthesizer.synthesize_stream(text)

# Send to Twilio/other phone API
for chunk in audio_stream:
    phone_system.stream_audio(chunk)
```

### Mobile App Integration

```javascript
// React Native / Flutter
fetch('/api/voice-response', {
    method: 'POST',
    body: JSON.stringify({ text: userInput, location: 'Hamilton' })
})
.then(response => response.blob())
.then(audioBlob => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
});
```

---

## Support

**ElevenLabs Documentation**: https://docs.elevenlabs.io
**Voice Library**: https://elevenlabs.io/app/voice-library
**API Reference**: https://docs.elevenlabs.io/api-reference

**Disaster Recovery Bot**:
- Emergency: 1300 309 361
- Business: Phill McGurk - IICRC Master Restorer
- Service Areas: Brisbane, Ipswich, Logan

---

*Document Version: 1.0*
*Last Updated: 2025-11-05*
*Status: Production Ready*
