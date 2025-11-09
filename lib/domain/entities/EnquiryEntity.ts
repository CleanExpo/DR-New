/**
 * Enquiry Entity - Domain Layer
 * Rich domain model with business logic
 */

import { BaseEntity } from './BaseEntity';
import { Email } from '../value-objects/Email';
import { Phone } from '../value-objects/Phone';
import { EnquiryStatus } from '../value-objects/EnquiryStatus';

export interface EnquiryProps {
  name: string;
  email: Email;
  phone: Phone;
  service: string;
  message: string;
  status: EnquiryStatus;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  source?: string;
  respondedAt?: Date;
  assignedTo?: string;
}

export class EnquiryEntity extends BaseEntity<string> {
  private _props: EnquiryProps;

  private constructor(id: string, props: EnquiryProps, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this._props = props;
  }

  static create(id: string, props: EnquiryProps): EnquiryEntity {
    return new EnquiryEntity(id, props);
  }

  static reconstitute(id: string, props: EnquiryProps, createdAt: Date, updatedAt: Date): EnquiryEntity {
    return new EnquiryEntity(id, props, createdAt, updatedAt);
  }

  // Getters
  get name(): string {
    return this._props.name;
  }

  get email(): Email {
    return this._props.email;
  }

  get phone(): Phone {
    return this._props.phone;
  }

  get service(): string {
    return this._props.service;
  }

  get message(): string {
    return this._props.message;
  }

  get status(): EnquiryStatus {
    return this._props.status;
  }

  get urgency(): 'low' | 'medium' | 'high' | 'emergency' {
    return this._props.urgency;
  }

  get source(): string | undefined {
    return this._props.source;
  }

  get respondedAt(): Date | undefined {
    return this._props.respondedAt;
  }

  get assignedTo(): string | undefined {
    return this._props.assignedTo;
  }

  // Business logic
  markAsResponded(): void {
    if (this._props.status.isResponded()) {
      throw new Error('Enquiry already responded');
    }
    this._props.status = EnquiryStatus.responded();
    this._props.respondedAt = new Date();
    this.touch();
  }

  assignTo(userId: string): void {
    if (!userId || userId.trim() === '') {
      throw new Error('Invalid user ID');
    }
    this._props.assignedTo = userId;
    this.touch();
  }

  escalateUrgency(): void {
    const urgencyLevels: Array<'low' | 'medium' | 'high' | 'emergency'> = ['low', 'medium', 'high', 'emergency'];
    const currentIndex = urgencyLevels.indexOf(this._props.urgency);
    if (currentIndex < urgencyLevels.length - 1) {
      this._props.urgency = urgencyLevels[currentIndex + 1];
      this.touch();
    }
  }

  isEmergency(): boolean {
    return this._props.urgency === 'emergency';
  }

  requiresImmediateResponse(): boolean {
    return this.isEmergency() && !this._props.status.isResponded();
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      phone: this.phone.value,
      service: this.service,
      message: this.message,
      status: this.status.value,
      urgency: this.urgency,
      source: this.source,
      respondedAt: this.respondedAt,
      assignedTo: this.assignedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
