import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { CreateTaskDTO } from '../DTO/create-task.dto'
import { UpdateTaskDTO } from '../DTO/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async findAll() { return this.taskModel.find(); }
  async findOne(id: string) { return this.taskModel.findById(id); }

  async createOne(createTask: CreateTaskDTO) {
    const newTask = new this.taskModel(createTask);
    return newTask.save();
  }

  async updateOne(id: string, task: UpdateTaskDTO) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteOne(id: string) { return this.taskModel.findByIdAndDelete(id); }
}