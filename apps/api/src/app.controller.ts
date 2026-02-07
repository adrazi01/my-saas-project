import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
// 1. Value import (for the logic)
import { CreateProjectSchema } from '@my-saas-project/shared';
// 2. Type-only import (for the compiler)
import type { CreateProjectDto } from '@my-saas-project/shared';

import { ZodValidationPipe } from './zod-validation.pipe';
import { AppService } from './app.service';

@Controller('projects')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getProjects() {
    return await this.appService.getProjects();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProjectSchema))
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.appService.createProject(createProjectDto);
  }
}
