import { PrismaClient } from '@prisma/client';
import { prisma } from '../connection';
import { cacheClient } from '../../cache/redis';
import { CacheOptions } from '../../cache/redis';

/**
 * Base repository with common database operations
 */
export abstract class BaseRepository<T> {
  protected db: PrismaClient;
  protected modelName: string;

  constructor(modelName: string) {
    this.db = prisma;
    this.modelName = modelName;
  }

  /**
   * Find by ID with optional caching
   */
  protected async findById(
    id: string,
    options?: {
      cache?: boolean;
      cacheKey?: string;
      cacheOptions?: CacheOptions;
      include?: any;
    }
  ): Promise<T | null> {
    const cacheKey = options?.cacheKey || `${this.modelName}:${id}`;

    // Try cache first if enabled
    if (options?.cache) {
      const cached = await cacheClient.get<T>(cacheKey);
      if (cached.cached && cached.data) {
        return cached.data;
      }
    }

    // Query database
    const model = (this.db as any)[this.modelName];
    const result = await model.findUnique({
      where: { id },
      include: options?.include,
    });

    // Store in cache if enabled
    if (options?.cache && result) {
      await cacheClient.set(cacheKey, result, options.cacheOptions);
    }

    return result;
  }

  /**
   * Find many with optional caching and pagination
   */
  protected async findMany(
    options?: {
      where?: any;
      include?: any;
      orderBy?: any;
      take?: number;
      skip?: number;
      cache?: boolean;
      cacheKey?: string;
      cacheOptions?: CacheOptions;
    }
  ): Promise<T[]> {
    const cacheKey = options?.cacheKey;

    // Try cache first if enabled and key provided
    if (options?.cache && cacheKey) {
      const cached = await cacheClient.get<T[]>(cacheKey);
      if (cached.cached && cached.data) {
        return cached.data;
      }
    }

    // Query database
    const model = (this.db as any)[this.modelName];
    const results = await model.findMany({
      where: options?.where,
      include: options?.include,
      orderBy: options?.orderBy,
      take: options?.take,
      skip: options?.skip,
    });

    // Store in cache if enabled
    if (options?.cache && cacheKey) {
      await cacheClient.set(cacheKey, results, options.cacheOptions);
    }

    return results;
  }

  /**
   * Count records with optional caching
   */
  protected async count(
    options?: {
      where?: any;
      cache?: boolean;
      cacheKey?: string;
      cacheOptions?: CacheOptions;
    }
  ): Promise<number> {
    const cacheKey = options?.cacheKey;

    // Try cache first if enabled and key provided
    if (options?.cache && cacheKey) {
      const cached = await cacheClient.get<number>(cacheKey);
      if (cached.cached && cached.data !== null) {
        return cached.data;
      }
    }

    // Query database
    const model = (this.db as any)[this.modelName];
    const count = await model.count({
      where: options?.where,
    });

    // Store in cache if enabled
    if (options?.cache && cacheKey) {
      await cacheClient.set(cacheKey, count, options.cacheOptions);
    }

    return count;
  }

  /**
   * Create record
   */
  protected async create(data: any, include?: any): Promise<T> {
    const model = (this.db as any)[this.modelName];
    return model.create({
      data,
      include,
    });
  }

  /**
   * Update record
   */
  protected async update(
    id: string,
    data: any,
    include?: any
  ): Promise<T> {
    const model = (this.db as any)[this.modelName];
    return model.update({
      where: { id },
      data,
      include,
    });
  }

  /**
   * Delete record
   */
  protected async delete(id: string): Promise<T> {
    const model = (this.db as any)[this.modelName];
    return model.delete({
      where: { id },
    });
  }

  /**
   * Find first record
   */
  protected async findFirst(
    options?: {
      where?: any;
      include?: any;
      orderBy?: any;
    }
  ): Promise<T | null> {
    const model = (this.db as any)[this.modelName];
    return model.findFirst({
      where: options?.where,
      include: options?.include,
      orderBy: options?.orderBy,
    });
  }

  /**
   * Batch create with transaction
   */
  protected async createMany(data: any[]): Promise<{ count: number }> {
    const model = (this.db as any)[this.modelName];
    return model.createMany({
      data,
      skipDuplicates: true,
    });
  }

  /**
   * Batch update with transaction
   */
  protected async updateMany(
    where: any,
    data: any
  ): Promise<{ count: number }> {
    const model = (this.db as any)[this.modelName];
    return model.updateMany({
      where,
      data,
    });
  }

  /**
   * Batch delete with transaction
   */
  protected async deleteMany(where: any): Promise<{ count: number }> {
    const model = (this.db as any)[this.modelName];
    return model.deleteMany({
      where,
    });
  }

  /**
   * Execute in transaction
   */
  protected async transaction<R>(
    fn: (tx: PrismaClient) => Promise<R>
  ): Promise<R> {
    return this.db.$transaction(fn as any);
  }

  /**
   * Paginate results
   */
  protected async paginate(
    options: {
      where?: any;
      include?: any;
      orderBy?: any;
      page?: number;
      pageSize?: number;
      cache?: boolean;
      cacheKey?: string;
      cacheOptions?: CacheOptions;
    }
  ): Promise<{
    data: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.findMany({
        where: options.where,
        include: options.include,
        orderBy: options.orderBy,
        take: pageSize,
        skip,
        cache: options.cache,
        cacheKey: options.cacheKey,
        cacheOptions: options.cacheOptions,
      }),
      this.count({
        where: options.where,
        cache: options.cache,
        cacheKey: options.cacheKey ? `${options.cacheKey}:count` : undefined,
        cacheOptions: options.cacheOptions,
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Find or create
   */
  protected async findOrCreate(
    where: any,
    create: any,
    include?: any
  ): Promise<T> {
    const model = (this.db as any)[this.modelName];

    const existing = await model.findFirst({
      where,
      include,
    });

    if (existing) {
      return existing;
    }

    return model.create({
      data: create,
      include,
    });
  }

  /**
   * Upsert (update or create)
   */
  protected async upsert(
    where: any,
    create: any,
    update: any,
    include?: any
  ): Promise<T> {
    const model = (this.db as any)[this.modelName];
    return model.upsert({
      where,
      create,
      update,
      include,
    });
  }
}
