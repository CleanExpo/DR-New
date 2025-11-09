/**
 * EnquiryStatus Value Object - Domain Layer
 * Type-safe status with state transitions
 */

type StatusValue = 'new' | 'in_progress' | 'responded' | 'closed' | 'spam';

export class EnquiryStatus {
  private readonly _value: StatusValue;

  private constructor(value: StatusValue) {
    this._value = value;
  }

  static new(): EnquiryStatus {
    return new EnquiryStatus('new');
  }

  static inProgress(): EnquiryStatus {
    return new EnquiryStatus('in_progress');
  }

  static responded(): EnquiryStatus {
    return new EnquiryStatus('responded');
  }

  static closed(): EnquiryStatus {
    return new EnquiryStatus('closed');
  }

  static spam(): EnquiryStatus {
    return new EnquiryStatus('spam');
  }

  static fromString(value: string): EnquiryStatus {
    const validStatuses: StatusValue[] = ['new', 'in_progress', 'responded', 'closed', 'spam'];
    if (!validStatuses.includes(value as StatusValue)) {
      throw new Error(`Invalid enquiry status: ${value}`);
    }
    return new EnquiryStatus(value as StatusValue);
  }

  get value(): StatusValue {
    return this._value;
  }

  isNew(): boolean {
    return this._value === 'new';
  }

  isInProgress(): boolean {
    return this._value === 'in_progress';
  }

  isResponded(): boolean {
    return this._value === 'responded';
  }

  isClosed(): boolean {
    return this._value === 'closed';
  }

  isSpam(): boolean {
    return this._value === 'spam';
  }

  canTransitionTo(newStatus: EnquiryStatus): boolean {
    const transitions: Record<StatusValue, StatusValue[]> = {
      new: ['in_progress', 'spam'],
      in_progress: ['responded', 'closed', 'spam'],
      responded: ['closed'],
      closed: [],
      spam: [],
    };

    return transitions[this._value].includes(newStatus._value);
  }

  equals(other: EnquiryStatus): boolean {
    if (!other) {
      return false;
    }
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
