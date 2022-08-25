import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userFinded = this.usersRepository.findById(user_id);
    let users: User[] = [];
    if (!userFinded) {
      throw new Error("User not found");
    } else if (!userFinded.admin) {
      throw new Error("User not allowed");
    } else {
      users = this.usersRepository.list();
    }
    return users;
  }
}

export { ListAllUsersUseCase };
