"""
Service Area Validator for Disaster Recovery & NRPG Bot

Validates if customer location is within service areas.
Service Areas: Brisbane, Ipswich, Logan
Business: Phill McGurk - IICRC Master Restorer

NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
"""

from typing import Optional, List, Tuple
from dataclasses import dataclass
from enum import Enum


class ServiceRegion(Enum):
    """Service regions"""
    BRISBANE = "Brisbane"
    IPSWICH = "Ipswich"
    LOGAN = "Logan"
    OUTSIDE_AREA = "Outside Service Area"


@dataclass
class ServiceAreaValidation:
    """Result of service area validation"""
    is_serviced: bool
    region: ServiceRegion
    suburb: Optional[str]
    confidence: float
    message: str
    alternative_suggestions: List[str]


class DisasterRecoveryServiceAreaValidator:
    """
    Service area validator for Disaster Recovery bot

    Validates if location is within service areas:
    - Brisbane (premium and standard suburbs)
    - Ipswich (premium and standard suburbs)
    - Logan (key and standard suburbs)
    """

    def __init__(self):
        # Brisbane suburbs (from website structure)
        self.brisbane_suburbs = {
            # Premium suburbs (comprehensive service)
            'premium': [
                'hamilton', 'ascot', 'new farm', 'bulimba', 'hawthorne',
                'teneriffe', 'fortitude valley', 'newstead'
            ],
            # Standard suburbs (full service)
            'standard': [
                'morningside', 'balmoral', 'cannon hill', 'murarrie', 'tingalpa',
                'wynnum', 'carina', 'camp hill', 'seven hills', 'norman park',
                'woolloongabba', 'greenslopes', 'stones corner', 'coorparoo',
                'east brisbane', 'kangaroo point', 'south brisbane', 'west end',
                'highgate hill', 'annerley', 'fairfield', 'dutton park',
                'brisbane city', 'spring hill', 'paddington', 'red hill',
                'milton', 'auchenflower', 'toowong', 'taringa', 'indooroopilly'
            ]
        }

        # Ipswich suburbs
        self.ipswich_suburbs = {
            # Premium suburbs (comprehensive service)
            'premium': [
                'karalee', 'brookwater', 'springfield lakes', 'augustine heights'
            ],
            # Standard suburbs (full service)
            'standard': [
                'bellbird park', 'redbank plains', 'goodna', 'camira',
                'booval', 'bundamba', 'raceview', 'forest lake', 'springfield',
                'ipswich', 'eastern heights', 'leichhardt', 'north ipswich',
                'west ipswich', 'yamanto', 'ripley', 'deebing heights'
            ]
        }

        # Logan suburbs
        self.logan_suburbs = {
            # Key suburbs (comprehensive service)
            'premium': [
                'springwood', 'shailer park', 'daisy hill', 'rochedale'
            ],
            # Standard suburbs (full service)
            'standard': [
                'underwood', 'eight mile plains', 'slacks creek', 'meadowbrook',
                'loganholme', 'tanah merah', 'waterford', 'beenleigh', 'eagleby',
                'logan central', 'woodridge', 'kingston', 'logan reserve',
                'browns plains', 'park ridge', 'greenbank', 'forestdale'
            ]
        }

        # Nearby areas (might service on case-by-case basis)
        self.nearby_areas = [
            'gold coast', 'sunshine coast', 'redlands', 'redland bay',
            'cleveland', 'victoria point', 'capalaba', 'pine rivers',
            'north lakes', 'strathpine', 'caboolture'
        ]

    def validate(self, location_input: str) -> ServiceAreaValidation:
        """
        Validate if location is within service area

        Args:
            location_input: Customer's location (suburb, postcode, or description)

        Returns:
            ServiceAreaValidation with service status and details
        """
        # Normalize input
        normalized = self._normalize_location(location_input)

        # Check each service region
        brisbane_result = self._check_region(normalized, ServiceRegion.BRISBANE)
        if brisbane_result:
            return brisbane_result

        ipswich_result = self._check_region(normalized, ServiceRegion.IPSWICH)
        if ipswich_result:
            return ipswich_result

        logan_result = self._check_region(normalized, ServiceRegion.LOGAN)
        if logan_result:
            return logan_result

        # Check if nearby area (potential service)
        if any(area in normalized for area in self.nearby_areas):
            return self._create_nearby_validation(normalized)

        # Not in service area
        return self._create_outside_area_validation(normalized)

    def _normalize_location(self, location: str) -> str:
        """Normalize location input"""
        # Convert to lowercase, remove extra spaces
        normalized = location.lower().strip()

        # Remove common words
        remove_words = ['suburb', 'area', 'near', 'around', 'close to', 'in']
        for word in remove_words:
            normalized = normalized.replace(word, '')

        # Clean up spaces
        normalized = ' '.join(normalized.split())

        return normalized

    def _check_region(
        self,
        location: str,
        region: ServiceRegion
    ) -> Optional[ServiceAreaValidation]:
        """Check if location is in specific region"""
        if region == ServiceRegion.BRISBANE:
            suburbs_dict = self.brisbane_suburbs
        elif region == ServiceRegion.IPSWICH:
            suburbs_dict = self.ipswich_suburbs
        elif region == ServiceRegion.LOGAN:
            suburbs_dict = self.logan_suburbs
        else:
            return None

        # Check premium suburbs first
        for suburb in suburbs_dict['premium']:
            if suburb in location or location in suburb:
                return ServiceAreaValidation(
                    is_serviced=True,
                    region=region,
                    suburb=suburb.title(),
                    confidence=0.95,
                    message=self._create_serviced_message(region, suburb, premium=True),
                    alternative_suggestions=[]
                )

        # Check standard suburbs
        for suburb in suburbs_dict['standard']:
            if suburb in location or location in suburb:
                return ServiceAreaValidation(
                    is_serviced=True,
                    region=region,
                    suburb=suburb.title(),
                    confidence=0.90,
                    message=self._create_serviced_message(region, suburb, premium=False),
                    alternative_suggestions=[]
                )

        # Check if region name mentioned without specific suburb
        if region.value.lower() in location:
            return ServiceAreaValidation(
                is_serviced=True,
                region=region,
                suburb=None,
                confidence=0.75,
                message=self._create_region_message(region),
                alternative_suggestions=[]
            )

        return None

    def _create_serviced_message(
        self,
        region: ServiceRegion,
        suburb: str,
        premium: bool
    ) -> str:
        """Create message for serviced area"""
        suburb_title = suburb.title()

        if premium:
            return f"""
YES - We service {suburb_title}, {region.value}

{suburb_title} is in our priority service area. As one of a limited number of Master Restorers in Brisbane & QLD, Phill McGurk provides comprehensive disaster recovery services to your area.

Our Credentials:
- IICRC Master Restorer (highest industry certification)
- Hazmat Licensed professional
- Hazmat Licensed
- Asbestos Assessor

24/7 Emergency Response Available
Call: 1300 309 361
""".strip()
        else:
            return f"""
YES - We service {suburb_title}, {region.value}

Phill McGurk provides professional disaster recovery services to {suburb_title} and surrounding {region.value} suburbs.

Our team responds 24/7 to emergencies across the greater {region.value} region with IICRC Master Restorer certified protocols.

Call: 1300 309 361
""".strip()

    def _create_region_message(self, region: ServiceRegion) -> str:
        """Create message when region mentioned but suburb unclear"""
        return f"""
YES - We service the {region.value} area

We need a specific suburb to provide accurate response time and service details.

Could you please specify which suburb in {region.value}?

Popular {region.value} suburbs we service include:
{', '.join([s.title() for s in list(self._get_region_suburbs(region)['premium'])[:5]])}

Call: 1300 309 361
""".strip()

    def _create_nearby_validation(self, location: str) -> ServiceAreaValidation:
        """Create validation for nearby areas"""
        return ServiceAreaValidation(
            is_serviced=False,
            region=ServiceRegion.OUTSIDE_AREA,
            suburb=location.title(),
            confidence=0.60,
            message=f"""
Your location ({location.title()}) is outside our primary service areas of Brisbane, Ipswich, and Logan.

However, we may be able to assist depending on:
- Emergency severity
- Property type (commercial properties prioritised)
- Specific circumstances

Please call us to discuss: 1300 309 361

Our primary service areas:
- Brisbane (Hamilton, Ascot, New Farm, and surrounding suburbs)
- Ipswich (Karalee, Brookwater, Springfield Lakes)
- Logan (Springwood, Shailer Park, Daisy Hill)
""".strip(),
            alternative_suggestions=[
                "Contact us to discuss your specific situation",
                "We can recommend trusted NRPG contractors in your area"
            ]
        )

    def _create_outside_area_validation(self, location: str) -> ServiceAreaValidation:
        """Create validation for outside service area"""
        return ServiceAreaValidation(
            is_serviced=False,
            region=ServiceRegion.OUTSIDE_AREA,
            suburb=location.title() if location else None,
            confidence=0.50,
            message=f"""
Unfortunately, {location.title()} is outside our current service areas.

We service:
- Brisbane (Hamilton, Ascot, New Farm, and surrounding suburbs)
- Ipswich (Karalee, Brookwater, Springfield Lakes, and surrounding areas)
- Logan (Springwood, Shailer Park, Daisy Hill, and surrounding suburbs)

For assistance in your area:
- Contact NRPG (National Restoration Procurement Group) for local certified contractors
- We can recommend trusted restoration professionals near you

Call us for referrals: 1300 309 361
""".strip(),
            alternative_suggestions=[
                "NRPG has certified contractors across Queensland",
                "Ask for a referral to a local IICRC certified professional"
            ]
        )

    def _get_region_suburbs(self, region: ServiceRegion) -> dict:
        """Get suburb list for region"""
        if region == ServiceRegion.BRISBANE:
            return self.brisbane_suburbs
        elif region == ServiceRegion.IPSWICH:
            return self.ipswich_suburbs
        elif region == ServiceRegion.LOGAN:
            return self.logan_suburbs
        return {'premium': [], 'standard': []}


def test_service_area_validator():
    """Test the service area validator"""
    validator = DisasterRecoveryServiceAreaValidator()

    test_locations = [
        "Hamilton",
        "Karalee, Ipswich",
        "Springwood",
        "Brisbane",
        "Cleveland",
        "Sydney",
        "Gold Coast",
        "Ascot",
        "Springfield Lakes"
    ]

    print("=== Disaster Recovery Service Area Validator Tests ===\n")

    for location in test_locations:
        result = validator.validate(location)

        print(f"Location: {location}")
        print(f"Is Serviced: {'YES' if result.is_serviced else 'NO'}")
        print(f"Region: {result.region.value}")
        print(f"Suburb: {result.suburb or 'Not specified'}")
        print(f"Confidence: {result.confidence}")
        print(f"\nMessage:")
        print(result.message)
        if result.alternative_suggestions:
            print(f"\nAlternatives: {', '.join(result.alternative_suggestions)}")
        print("=" * 80)
        print()


if __name__ == "__main__":
    test_service_area_validator()
