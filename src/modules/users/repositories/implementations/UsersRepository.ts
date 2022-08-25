import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userObj = new User();

    Object.assign(userObj, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(userObj);
    return userObj;
  }

  findById(id: string): User | undefined {
    const userFinded = this.users.find((user) => user.id === id);
    return userFinded;
  }

  findByEmail(email: string): User | undefined {
    const userFinded = this.users.find((user) => user.email === email);
    return userFinded;
  }

  turnAdmin(receivedUser: User): User {
    const userUpdated = receivedUser;
    const indexUser = this.users.findIndex(
      (item) => item.id === receivedUser.id
    );
    Object.assign(userUpdated, {
      admin: true,
      updated_at: new Date(),
    });
    this.users.splice(indexUser, 1, userUpdated);
    return userUpdated;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
