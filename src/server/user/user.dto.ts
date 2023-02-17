import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDTO {
  readonly _id: string;

  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @IsNotEmpty({ message: '用户密码必填' })
  readonly password: string;
}

export class EditUserDTO {
  readonly username: string;
  readonly password: string;
}