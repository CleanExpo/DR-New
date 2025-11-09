/**
 * Generic Repository Pattern Implementation
 *
 * Type-safe data access layer with generic CRUD operations
 */

import type {
  Repository,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
  QueryBuilder,
  ComparisonOperator,
  Nullable,
} from '@/lib/types';

/**
 * Base Repository Implementation
 */
export abstract class BaseRepository<T extends { id: string }, ID = string>
  implements Repository<T, ID>
{
  protected abstract tableName: string;

  abstract findById(id: ID): Promise<Nullable<T>>;
  abstract findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  abstract create(data: Omit<T, 'id'>): Promise<T>;
  abstract update(id: ID, data: Partial<T>): Promise<T>;
  abstract delete(id: ID): Promise<void>;
  abstract search(params: SearchParams): Promise<PaginatedResponse<T>>;

  /**
   * Find one by field
   */
  async findOne(field: keyof T, value: any): Promise<Nullable<T>> {
    const results = await this.findBy(field, value, { page: 1, pageSize: 1 });
    return results.items[0] ?? null;
  }

  /**
   * Find by field
   */
  abstract findBy(
    field: keyof T,
    value: any,
    params?: PaginationParams
  ): Promise<PaginatedResponse<T>>;

  /**
   * Count records
   */
  abstract count(where?: Partial<T>): Promise<number>;

  /**
   * Check if exists
   */
  async exists(id: ID): Promise<boolean> {
    const result = await this.findById(id);
    return result !== null;
  }

  /**
   * Batch operations
   */
  async createMany(data: Omit<T, 'id'>[]): Promise<T[]> {
    return Promise.all(data.map((item) => this.create(item)));
  }

  async updateMany(updates: Array<{ id: ID; data: Partial<T> }>): Promise<T[]> {
    return Promise.all(updates.map(({ id, data }) => this.update(id, data)));
  }

  async deleteMany(ids: ID[]): Promise<void> {
    await Promise.all(ids.map((id) => this.delete(id)));
  }

  /**
   * Query builder
   */
  abstract query(): QueryBuilder<T>;
}

/**
 * In-Memory Repository Implementation (for testing)
 */
export class InMemoryRepository<T extends { id: string }>
  extends BaseRepository<T, string>
{
  protected tableName = 'memory';
  private data: Map<string, T> = new Map();

  async findById(id: string): Promise<Nullable<T>> {
    return this.data.get(id) ?? null;
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<T>> {
    const items = Array.from(this.data.values());
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: items.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        hasNextPage: end < items.length,
        hasPreviousPage: page > 1,
      },
    };
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const id = Math.random().toString(36).substring(7);
    const item = { ...data, id } as T;
    this.data.set(id, item);
    return item;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }
    const updated = { ...existing, ...data };
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }

  async search(params: SearchParams): Promise<PaginatedResponse<T>> {
    let items = Array.from(this.data.values());

    // Apply filters
    if (params.filters) {
      items = items.filter((item) => {
        return Object.entries(params.filters!).every(([key, value]) => {
          return (item as any)[key] === value;
        });
      });
    }

    // Apply search
    if (params.query && params.fields) {
      const query = params.query.toLowerCase();
      items = items.filter((item) => {
        return params.fields!.some((field) => {
          const value = (item as any)[field];
          return value?.toString().toLowerCase().includes(query);
        });
      });
    }

    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: items.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        hasNextPage: end < items.length,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findBy(
    field: keyof T,
    value: any,
    params?: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const items = Array.from(this.data.values()).filter(
      (item) => item[field] === value
    );

    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: items.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        hasNextPage: end < items.length,
        hasPreviousPage: page > 1,
      },
    };
  }

  async count(where?: Partial<T>): Promise<number> {
    if (!where) {
      return this.data.size;
    }

    const items = Array.from(this.data.values()).filter((item) => {
      return Object.entries(where).every(([key, value]) => {
        return (item as any)[key] === value;
      });
    });

    return items.length;
  }

  query(): QueryBuilder<T> {
    return new InMemoryQueryBuilder(this.data);
  }

  // Test helpers
  clear(): void {
    this.data.clear();
  }

  seed(items: T[]): void {
    items.forEach((item) => {
      this.data.set(item.id, item);
    });
  }
}

/**
 * In-Memory Query Builder
 */
class InMemoryQueryBuilder<T> implements QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  private sortField?: keyof T;
  private sortDirection?: 'asc' | 'desc';
  private limitCount?: number;
  private offsetCount: number = 0;
  private selectFields?: (keyof T)[];

  constructor(private data: Map<string, T>) {}

  where(field: keyof T, operator: ComparisonOperator, value: any): this {
    this.filters.push((item) => {
      const fieldValue = item[field];
      switch (operator) {
        case '=':
          return fieldValue === value;
        case '!=':
          return fieldValue !== value;
        case '>':
          return fieldValue > value;
        case '>=':
          return fieldValue >= value;
        case '<':
          return fieldValue < value;
        case '<=':
          return fieldValue <= value;
        case 'LIKE':
          return String(fieldValue).includes(String(value));
        case 'IN':
          return Array.isArray(value) && value.includes(fieldValue);
        case 'NOT IN':
          return Array.isArray(value) && !value.includes(fieldValue);
        default:
          return false;
      }
    });
    return this;
  }

  whereIn(field: keyof T, values: any[]): this {
    return this.where(field, 'IN', values);
  }

  orderBy(field: keyof T, direction: 'asc' | 'desc'): this {
    this.sortField = field;
    this.sortDirection = direction;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  offset(count: number): this {
    this.offsetCount = count;
    return this;
  }

  select(...fields: (keyof T)[]): this {
    this.selectFields = fields;
    return this;
  }

  async execute(): Promise<T[]> {
    let items = Array.from(this.data.values());

    // Apply filters
    items = items.filter((item) => this.filters.every((filter) => filter(item)));

    // Apply sorting
    if (this.sortField) {
      items.sort((a, b) => {
        const aVal = a[this.sortField!];
        const bVal = b[this.sortField!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return this.sortDirection === 'desc' ? -comparison : comparison;
      });
    }

    // Apply offset
    items = items.slice(this.offsetCount);

    // Apply limit
    if (this.limitCount !== undefined) {
      items = items.slice(0, this.limitCount);
    }

    // Apply select
    if (this.selectFields) {
      items = items.map((item) => {
        const selected = {} as T;
        this.selectFields!.forEach((field) => {
          selected[field] = item[field];
        });
        return selected;
      });
    }

    return items;
  }

  async first(): Promise<Nullable<T>> {
    const items = await this.limit(1).execute();
    return items[0] ?? null;
  }

  async count(): Promise<number> {
    let items = Array.from(this.data.values());
    items = items.filter((item) => this.filters.every((filter) => filter(item)));
    return items.length;
  }
}

/**
 * Repository Factory
 */
export class RepositoryFactory {
  private static repositories = new Map<string, any>();

  static register<T extends { id: string }>(
    name: string,
    repository: Repository<T>
  ): void {
    this.repositories.set(name, repository);
  }

  static get<T extends { id: string }>(name: string): Repository<T> {
    const repository = this.repositories.get(name);
    if (!repository) {
      throw new Error(`Repository ${name} not found`);
    }
    return repository;
  }

  static has(name: string): boolean {
    return this.repositories.has(name);
  }

  static clear(): void {
    this.repositories.clear();
  }
}
