/**
 * Dependency Injection Container
 * Clean Architecture: Dependency inversion
 */

import { PrismaClient } from '@prisma/client';
import { UnitOfWork } from './persistence/UnitOfWork';
import { EventDispatcher } from '../domain/events/EventDispatcher';
import { EventStore, InMemoryEventStore } from '../domain/events/EventStore';
import { JobQueue } from './jobs/JobQueue';
import { EmailNotificationJobProcessor } from './jobs/EmailNotificationJob';
import { EnquiryNotificationJobProcessor } from './jobs/EnquiryNotificationJob';

// Command Handlers
import { CreateEnquiryCommand } from '../use-cases/commands/CreateEnquiryCommand';
import { RespondToEnquiryCommand } from '../use-cases/commands/RespondToEnquiryCommand';
import { AssignEnquiryCommand } from '../use-cases/commands/AssignEnquiryCommand';

// Query Handlers
import { GetEnquiryQuery } from '../use-cases/queries/GetEnquiryQuery';
import { ListEnquiriesQuery } from '../use-cases/queries/ListEnquiriesQuery';

export class DependencyContainer {
  private static instance: DependencyContainer;

  // Infrastructure
  private _prisma?: PrismaClient;
  private _uow?: UnitOfWork;
  private _eventDispatcher?: EventDispatcher;
  private _eventStore?: EventStore;
  private _jobQueue?: JobQueue;

  // Commands
  private _createEnquiryCommand?: CreateEnquiryCommand;
  private _respondToEnquiryCommand?: RespondToEnquiryCommand;
  private _assignEnquiryCommand?: AssignEnquiryCommand;

  // Queries
  private _getEnquiryQuery?: GetEnquiryQuery;
  private _listEnquiriesQuery?: ListEnquiriesQuery;

  private constructor() {}

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  // Infrastructure getters
  get prisma(): PrismaClient {
    if (!this._prisma) {
      this._prisma = new PrismaClient();
    }
    return this._prisma;
  }

  get uow(): UnitOfWork {
    if (!this._uow) {
      this._uow = new UnitOfWork(this.prisma);
    }
    return this._uow;
  }

  get eventDispatcher(): EventDispatcher {
    if (!this._eventDispatcher) {
      this._eventDispatcher = EventDispatcher.getInstance();
    }
    return this._eventDispatcher;
  }

  get eventStore(): EventStore {
    if (!this._eventStore) {
      this._eventStore = EventStore.initialize(new InMemoryEventStore());
    }
    return this._eventStore;
  }

  get jobQueue(): JobQueue {
    if (!this._jobQueue) {
      this._jobQueue = new JobQueue();

      // Register job processors
      this._jobQueue.registerProcessor('email-notification', new EmailNotificationJobProcessor());
      this._jobQueue.registerProcessor('enquiry-notification', new EnquiryNotificationJobProcessor());
    }
    return this._jobQueue;
  }

  // Command getters
  get createEnquiryCommand(): CreateEnquiryCommand {
    if (!this._createEnquiryCommand) {
      this._createEnquiryCommand = new CreateEnquiryCommand(
        this.uow,
        this.eventDispatcher,
        this.eventStore
      );
    }
    return this._createEnquiryCommand;
  }

  get respondToEnquiryCommand(): RespondToEnquiryCommand {
    if (!this._respondToEnquiryCommand) {
      this._respondToEnquiryCommand = new RespondToEnquiryCommand(
        this.uow,
        this.eventDispatcher,
        this.eventStore
      );
    }
    return this._respondToEnquiryCommand;
  }

  get assignEnquiryCommand(): AssignEnquiryCommand {
    if (!this._assignEnquiryCommand) {
      this._assignEnquiryCommand = new AssignEnquiryCommand(
        this.uow,
        this.eventDispatcher,
        this.eventStore
      );
    }
    return this._assignEnquiryCommand;
  }

  // Query getters
  get getEnquiryQuery(): GetEnquiryQuery {
    if (!this._getEnquiryQuery) {
      this._getEnquiryQuery = new GetEnquiryQuery(this.uow);
    }
    return this._getEnquiryQuery;
  }

  get listEnquiriesQuery(): ListEnquiriesQuery {
    if (!this._listEnquiriesQuery) {
      this._listEnquiriesQuery = new ListEnquiriesQuery(this.uow);
    }
    return this._listEnquiriesQuery;
  }

  // Cleanup
  async cleanup(): Promise<void> {
    if (this._prisma) {
      await this._prisma.$disconnect();
    }
    if (this._jobQueue) {
      this._jobQueue.stopProcessing();
    }
  }
}

// Export singleton instance
export const container = DependencyContainer.getInstance();
