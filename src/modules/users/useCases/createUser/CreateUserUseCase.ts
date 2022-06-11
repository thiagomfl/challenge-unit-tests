import bcrypt from 'bcrypt';
import { inject, injectable } from "tsyringe";

import { CreateUserError } from "./CreateUserError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./ICreateUserDTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await bcrypt.hash(password, 8);

    return this.usersRepository.create({
      email,
      name,
      password: passwordHash,
    });
  }
}
