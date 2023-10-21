import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import axios from 'axios';

const { EXTERNAL_API_URL } = process.env;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await axios.post(
        `${EXTERNAL_API_URL}/users`,
        createUserDto,
      );
      const { data: user } = response;
      await this.usersRepository.save(user);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await axios.post(
        `${EXTERNAL_API_URL}/users`,
        updateUserDto,
      );
      const { data: user } = response;
      await this.usersRepository.update({ id }, user);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      await axios.delete(`${EXTERNAL_API_URL}/users/${id}`);
      await this.usersRepository.delete({ id });
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUsers(page: number) {
    try {
      const response = await axios.get(`${EXTERNAL_API_URL}/users`, {
        params: { page },
      });
      const {
        data: { data: users },
      } = response;
      this.usersRepository.save(users);
      return users;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserById(id: number) {
    try {
      const response = await axios.get(`${EXTERNAL_API_URL}/users/${id}`);
      const {
        data: { data: user },
      } = response;
      this.usersRepository.save(user);
      return user;
    } catch (err) {
      if(err?.response?.status === 404) {
        throw new NotFoundException(err.response.data.message);
      } 
      throw new Error(err);
    }
  }
}
