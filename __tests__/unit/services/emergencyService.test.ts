/**
 * Emergency Service Unit Tests
 *
 * TDD example for emergency dispatch service with ETA calculation.
 */

import { emergencyContactFactory } from '@/__tests__/factories';

// Mock service (replace with actual implementation)
class EmergencyService {
  private readonly PRIORITY_SUBURBS = ['Hamilton', 'Ascot', 'New Farm', 'Toowong'];
  private readonly IPSWICH_SUBURBS = ['Karalee', 'Brookwater', 'Springfield Lakes'];
  private readonly PRIORITY_ETA = 30;
  private readonly STANDARD_ETA = 45;
  private readonly IPSWICH_ETA = 45;

  calculateETA(suburb: string, serviceType: string): number {
    const isPriority = this.PRIORITY_SUBURBS.includes(suburb);
    const isIpswich = this.IPSWICH_SUBURBS.includes(suburb);
    const isEmergency = ['water-damage-restoration', 'fire-damage-restoration'].includes(serviceType);

    if (isPriority && isEmergency) return this.PRIORITY_ETA;
    if (isIpswich) return this.IPSWICH_ETA;
    return this.STANDARD_ETA;
  }

  dispatch(contact: any) {
    const suburb = this.extractSuburb(contact.address);
    const eta = this.calculateETA(suburb, contact.serviceType);

    return {
      eta,
      suburb,
      dispatchTime: new Date(),
      teamAssigned: 'Team A',
      priority: eta === this.PRIORITY_ETA ? 'high' : 'standard',
    };
  }

  private extractSuburb(address: string): string {
    // Extract suburb from "123 Main St, Hamilton, QLD 4007"
    const parts = address.split(',');
    return parts[1]?.trim() || '';
  }
}

describe('EmergencyService', () => {
  let service: EmergencyService;

  beforeEach(() => {
    service = new EmergencyService();
  });

  describe('calculateETA', () => {
    it('should calculate 30 minute ETA for water damage in Hamilton', () => {
      const eta = service.calculateETA('Hamilton', 'water-damage-restoration');
      expect(eta).toBe(30);
    });

    it('should calculate 30 minute ETA for fire damage in Ascot', () => {
      const eta = service.calculateETA('Ascot', 'fire-damage-restoration');
      expect(eta).toBe(30);
    });

    it('should calculate 45 minute ETA for mould remediation in Hamilton', () => {
      const eta = service.calculateETA('Hamilton', 'mould-remediation');
      expect(eta).toBe(45);
    });

    it('should calculate 45 minute ETA for water damage in Brisbane CBD', () => {
      const eta = service.calculateETA('CBD', 'water-damage-restoration');
      expect(eta).toBe(45);
    });

    it('should calculate 45 minute ETA for Ipswich suburbs', () => {
      const eta = service.calculateETA('Karalee', 'water-damage-restoration');
      expect(eta).toBe(45);
    });

    it('should handle all priority suburbs', () => {
      const prioritySuburbs = ['Hamilton', 'Ascot', 'New Farm', 'Toowong'];

      prioritySuburbs.forEach(suburb => {
        const eta = service.calculateETA(suburb, 'water-damage-restoration');
        expect(eta).toBe(30);
      });
    });
  });

  describe('dispatch', () => {
    it('should dispatch team with correct ETA for water damage', () => {
      const contact = emergencyContactFactory.createWaterDamage();
      const dispatch = service.dispatch(contact);

      expect(dispatch).toHaveProperty('eta');
      expect(dispatch).toHaveProperty('suburb');
      expect(dispatch).toHaveProperty('dispatchTime');
      expect(dispatch).toHaveProperty('teamAssigned');
      expect(dispatch).toHaveProperty('priority');
    });

    it('should set high priority for Hamilton water damage', () => {
      const contact = emergencyContactFactory.create({
        address: '123 Main St, Hamilton, QLD 4007',
        serviceType: 'water-damage-restoration',
      });

      const dispatch = service.dispatch(contact);

      expect(dispatch.priority).toBe('high');
      expect(dispatch.eta).toBe(30);
      expect(dispatch.suburb).toBe('Hamilton');
    });

    it('should set standard priority for mould remediation', () => {
      const contact = emergencyContactFactory.createMouldIssue();
      const dispatch = service.dispatch(contact);

      expect(dispatch.priority).toBe('standard');
      expect(dispatch.eta).toBeGreaterThan(30);
    });

    it('should assign team to dispatch', () => {
      const contact = emergencyContactFactory.create();
      const dispatch = service.dispatch(contact);

      expect(dispatch.teamAssigned).toBeDefined();
      expect(typeof dispatch.teamAssigned).toBe('string');
    });

    it('should record dispatch time', () => {
      const contact = emergencyContactFactory.create();
      const dispatch = service.dispatch(contact);

      expect(dispatch.dispatchTime).toBeInstanceOf(Date);
      expect(dispatch.dispatchTime.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('suburb extraction', () => {
    it('should extract suburb from full address', () => {
      const contact = emergencyContactFactory.create({
        address: '456 River Rd, Ascot, QLD 4007',
      });

      const dispatch = service.dispatch(contact);
      expect(dispatch.suburb).toBe('Ascot');
    });

    it('should handle addresses with different formats', () => {
      const addresses = [
        { input: '123 Main St, Hamilton, QLD 4007', expected: 'Hamilton' },
        { input: 'Unit 5/789 Creek Rd, New Farm, QLD 4005', expected: 'New Farm' },
        { input: '1 High St, Toowong, QLD 4066', expected: 'Toowong' },
      ];

      addresses.forEach(({ input, expected }) => {
        const contact = emergencyContactFactory.create({ address: input });
        const dispatch = service.dispatch(contact);
        expect(dispatch.suburb).toBe(expected);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty address gracefully', () => {
      const contact = emergencyContactFactory.create({ address: '' });
      const dispatch = service.dispatch(contact);

      expect(dispatch.suburb).toBe('');
    });

    it('should handle invalid service type with standard ETA', () => {
      const contact = emergencyContactFactory.create({
        serviceType: 'invalid-service',
        address: '123 Main St, Hamilton, QLD 4007',
      });

      const dispatch = service.dispatch(contact);
      expect(dispatch.eta).toBe(45); // Standard ETA for non-emergency
    });
  });
});

describe('EmergencyService Integration', () => {
  it('should process batch of emergency contacts', () => {
    const service = new EmergencyService();
    const contacts = emergencyContactFactory.createBatch(5);

    const dispatches = contacts.map(contact => service.dispatch(contact));

    expect(dispatches).toHaveLength(5);
    dispatches.forEach(dispatch => {
      expect(dispatch.eta).toBeGreaterThan(0);
      expect(dispatch.suburb).toBeTruthy();
    });
  });

  it('should prioritize multiple emergency contacts correctly', () => {
    const service = new EmergencyService();

    const hamiltonWater = emergencyContactFactory.create({
      address: '123 Main St, Hamilton, QLD 4007',
      serviceType: 'water-damage-restoration',
    });

    const cbdMould = emergencyContactFactory.create({
      address: '456 Queen St, CBD, QLD 4000',
      serviceType: 'mould-remediation',
    });

    const ascotFire = emergencyContactFactory.create({
      address: '789 Race Course Rd, Ascot, QLD 4007',
      serviceType: 'fire-damage-restoration',
    });

    const dispatches = [
      service.dispatch(hamiltonWater),
      service.dispatch(cbdMould),
      service.dispatch(ascotFire),
    ];

    // Hamilton water damage should be high priority
    expect(dispatches[0].priority).toBe('high');
    expect(dispatches[0].eta).toBe(30);

    // CBD mould should be standard priority
    expect(dispatches[1].priority).toBe('standard');
    expect(dispatches[1].eta).toBe(45);

    // Ascot fire should be high priority
    expect(dispatches[2].priority).toBe('high');
    expect(dispatches[2].eta).toBe(30);
  });
});
