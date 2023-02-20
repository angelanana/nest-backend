import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entities/user/user.entity';
import { CreateUserDTO, EditUserDTO } from './user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  // 添加单个用户
  async create(user: Partial<CreateUserDTO>): Promise<UsersEntity> {
    const { username, password } = user;
    if (!username) {
      throw new HttpException('缺少用户名称', 401);
    }
    if (!password) {
      throw new HttpException('缺少用户密码', 401);
    }
    const doc = await this.usersRepository.findOne({ where: { username } });
    if (doc) {
      throw new HttpException('用户名已存在', 401);
    }

    return await this.usersRepository.save(user);
  }

  // 查找所有用户
  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  // 查找单个用户
  findOne(id: number): Promise<UsersEntity> {
    return this.usersRepository.findOne({
      where: { uid: id },
    });
  }

  // 删除单个用户
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // 编辑单个用户
  async editOne(id: number, body: EditUserDTO): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne({
      where: { uid: id },
    });
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    const updateUser = this.usersRepository.merge(existUser, body);
    return this.usersRepository.save(updateUser);
    // await this.usersRepository.update(id, body)
  }
}
