import { Controller, Get, Post, Body, Param, Put, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('TASK_SERVICE') private readonly taskServiceClient: ClientProxy
  ) {}

  @Get()
  getHello() {
    return 'Welcome to API Gateway';
  }
  
  // Forward user requests
  @Post('users')
  createUser(@Body() createUserDto: any) {
    return this.userServiceClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Get('users')
  findAllUsers() {
    return this.userServiceClient.send({ cmd: 'findAllUsers' }, {});
  }

  @Get('users/:id')
  findOneUser(@Param('id') id: string) {
    return this.userServiceClient.send({ cmd: 'findOneUser' }, id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userServiceClient.send({ cmd: 'updateUser' }, { id, ...updateUserDto });
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userServiceClient.send({ cmd: 'deleteUser' }, id);
  }

  // Forward task requests
  @Post('tasks')
  createTask(@Body() createTaskDto: any) {
    return this.taskServiceClient.send({ cmd: 'createTask' }, createTaskDto);
  }

  @Get('tasks')
  findAllTasks() {
    return this.taskServiceClient.send({ cmd: 'findAllTasks' }, {});
  }

  @Get('tasks/:id')
  findOneTask(@Param('id') id: string) {
    return this.taskServiceClient.send({ cmd: 'findOneTask' }, id);
  }

  @Put('tasks/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.taskServiceClient.send({ cmd: 'updateTask' }, { id, ...updateTaskDto });
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskServiceClient.send({ cmd: 'deleteTask' }, id);
  }
}
