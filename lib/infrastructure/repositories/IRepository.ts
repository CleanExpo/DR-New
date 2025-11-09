/**
 * Generic Repository Interface - Infrastructure Layer
 * Repository pattern with specification support
 */

import { BaseEntity } from '@/lib/domain/entities/BaseEntity';

export interface ISpecification<T> {
  isSatisfiedBy(entity: T): boolean;
  and(spec: ISpecification<T>): ISpecification<T>;
  or(spec: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}

export abstract class Specification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(entity: T): boolean;

  and(spec: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, spec);
  }

  or(spec: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, spec);
  }

  not(): ISpecification<T> {
    return new NotSpecification(this);
  }
}

class AndSpecification<T> extends Specification<T> {
  constructor(private left: ISpecification<T>, private right: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return this.left.isSatisfiedBy(entity) && this.right.isSatisfiedBy(entity);
  }
}

class OrSpecification<T> extends Specification<T> {
  constructor(private left: ISpecification<T>, private right: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return this.left.isSatisfiedBy(entity) || this.right.isSatisfiedBy(entity);
  }
}

class NotSpecification<T> extends Specification<T> {
  constructor(private spec: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(entity: T): boolean {
    return !this.spec.isSatisfiedBy(entity);
  }
}

export interface IRepository<T extends BaseEntity<ID>, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  findBySpecification(spec: ISpecification<T>): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
  count(): Promise<number>;
  exists(id: ID): Promise<boolean>;
}
