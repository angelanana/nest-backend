import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, EditUserDTO } from './user.dto';
// import { User } from './user.interface';

// interface UserResponse<T = unknown> {
//   code: number;
//   data?: T;
//   message: string;
// }

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users_list
  @Get('users_list')
  async findAll(): Promise<any> {
    return {
      userList: await this.userService.findAll(),
    };
  }

  // POST /user/create
  @Post('create')
  async createOne(@Body() user: CreateUserDTO): Promise<any> {
    await this.userService.create(user);
    return true;
  }

  // DELETE /user/:id
  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    await this.userService.remove(id);
    return true;
  }

  // GET /user/:id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.userService.findOne(id);
  }

  // PUT /user/:id
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() body: EditUserDTO,
  ): Promise<any> {
    await this.userService.editOne(id, body);
    return {
      user: await this.userService.findAll(),
    };
  }
}
