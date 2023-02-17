import { 
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, EditUserDTO } from './user.dto';
// import { User } from './user.interface';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users_list
  @Get('users_list')
  async findAll(): Promise<UserResponse> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: '操作成功'
    }
  }

  // POST /user/create
  @Post('create')
  async createOne(@Body() user: CreateUserDTO): Promise<UserResponse> {
    await this.userService.create(user)
    return {
      code: 200,
      message: '操作成功'
    }
  }

  // DELETE /user/:id
  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<UserResponse> {
    await this.userService.remove(id);
    return {
      code: 200,
      message: '操作成功'
    }
  }

  // GET /user/:id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponse> {
    return {
      code: 200,
      data: await this.userService.findOne(id),
      message: '操作成功'
    }
  }

  // PUT /user/:id
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() body: EditUserDTO
  ): Promise<UserResponse> {
    await this.userService.editOne(id, body)
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: '操作成功'
    }
  }
}
