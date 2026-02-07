import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { projects } from './schema';
import * as schema from './schema';

@Injectable()
export class AppService {
  constructor(@Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>) {}

  async getProjects() {
    return await this.db.select().from(projects);
  }
  async createProject(data: { name: string; description?: string }) {
    const result = await this.db.insert(projects).values(data).returning();
    return result[0];
  }
}
