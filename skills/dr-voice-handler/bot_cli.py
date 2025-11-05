#!/usr/bin/env python3
"""
Disaster Recovery Bot CLI Interface

Command-line interface for the Disaster Recovery bot.
Accepts message and location via CLI arguments and outputs JSON response.

Project: Disaster Recovery & NRPG (NOT RestoreAssist)
Business: Phill McGurk - IICRC Master Restorer

Usage:
    python bot_cli.py --message "My house is flooding!" --location "Hamilton"
    python bot_cli.py --message "Need quote for water damage"
"""

import sys
import json
import argparse
import logging
from typing import Dict, Any, Optional

# Import bot handler
from handler import DisasterRecoveryVoiceHandler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stderr)]  # Log to stderr, not stdout
)
logger = logging.getLogger(__name__)


def process_message(message: str, location: Optional[str] = None) -> Dict[str, Any]:
    """
    Process a message through the bot and return JSON response

    Args:
        message: User's message
        location: Optional location (suburb)

    Returns:
        Dictionary with bot response and metadata
    """
    try:
        # Initialize bot handler
        handler = DisasterRecoveryVoiceHandler()

        # Process the message
        result = handler.process_voice_input(message, location)

        # Generate text response
        text_response = handler.generate_voice_response(result)

        # Build response with all metadata
        response = {
            'success': True,
            'message': message,
            'location': location,
            'response': text_response,
            'suggested_response': result['suggested_response'],
            'fallback_response': result.get('fallback_response', ''),
            'classification': result['classification'],
            'routing': result['routing'],
            'area_validation': result.get('area_validation'),
            'timestamp': handler.get_timestamp() if hasattr(handler, 'get_timestamp') else None
        }

        return response

    except Exception as e:
        logger.error(f"Bot processing error: {e}", exc_info=True)
        return {
            'success': False,
            'error': str(e),
            'message': message,
            'location': location,
            'response': generate_error_response()
        }


def generate_error_response() -> str:
    """Generate error fallback response"""
    return """Thank you for contacting Disaster Recovery Brisbane.

We're experiencing a temporary issue processing your message. For immediate emergency assistance, please call:

*** 1300 309 361 ***

Available 24/7 for emergencies across Brisbane, Ipswich, and Logan.

Phill McGurk - IICRC Master Restorer
Service Areas: Brisbane, Ipswich, Logan
Emergency Contact: 1300 309 361"""


def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description='Disaster Recovery Bot CLI',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python bot_cli.py --message "My house is flooding in Hamilton!"
  python bot_cli.py --message "Fire damage" --location "Ipswich"
  python bot_cli.py --message "Do you service Logan area?" --location "Springwood"

Project: Disaster Recovery & NRPG
Business: Phill McGurk - IICRC Master Restorer
Emergency: 1300 309 361
        """
    )

    parser.add_argument(
        '--message',
        '-m',
        required=True,
        help='User message to process'
    )

    parser.add_argument(
        '--location',
        '-l',
        required=False,
        help='User location (suburb name)'
    )

    parser.add_argument(
        '--debug',
        action='store_true',
        help='Enable debug logging'
    )

    parser.add_argument(
        '--pretty',
        action='store_true',
        help='Pretty-print JSON output'
    )

    args = parser.parse_args()

    # Set debug logging if requested
    if args.debug:
        logging.getLogger().setLevel(logging.DEBUG)
        logger.debug("Debug logging enabled")

    # Process the message
    logger.info(f"Processing message: {args.message[:50]}...")
    if args.location:
        logger.info(f"Location: {args.location}")

    result = process_message(args.message, args.location)

    # Output JSON to stdout
    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(result, ensure_ascii=False))

    # Exit with appropriate code
    sys.exit(0 if result.get('success', False) else 1)


if __name__ == '__main__':
    main()
