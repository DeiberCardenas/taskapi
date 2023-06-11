import { CreateTaskDTO } from './../DTO/create-task.dto';
import {
  Controller, Get, Post, Delete, Body, Param, Put,
  ConflictException, NotFoundException, BadRequestException, HttpCode
} from '@nestjs/common';
import { TasksService } from './task.service';
import { UpdateTaskDTO } from 'src/DTO/update-task.dto';
import mongoose, { ObjectId, Schema } from 'mongoose';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  findAll() { return this.taskService.findAll(); }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createOne(@Body() body: CreateTaskDTO) {
    try {
      return await this.taskService.createOne(body);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('This task already exists');
      }
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const task = await this.taskService.deleteOne(id)
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;

  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const task = await this.taskService.updateOne(id, body);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

}
