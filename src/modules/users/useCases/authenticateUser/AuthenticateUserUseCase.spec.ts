import "reflect-metadata"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });

    const authUser = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authUser).toHaveProperty('token');
  });

});
