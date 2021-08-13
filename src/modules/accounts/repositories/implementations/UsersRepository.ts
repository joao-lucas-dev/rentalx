import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar,
    });

    await this.repository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({
      email,
    });

    return user;
  }

  findById(user_id: string): Promise<User> {
    const user = this.repository.findOne({
      id: user_id,
    });

    return user;
  }
}

export { UsersRepository };
