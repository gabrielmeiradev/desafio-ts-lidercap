import { ClientError } from "../../errors/client.error";
import { UserRepository } from "../../repositories/user/user.repository";
import { GetUserDTO, UserServiceInterface } from "./user.service.interface";

export class UserService implements UserServiceInterface {
  private constructor(readonly userRepository: UserRepository) {}

  static build(userRepository: UserRepository) {
    return new UserService(userRepository);
  }

  async get(id: number): Promise<GetUserDTO> {
    if (Number.isNaN(id)) {
      throw new ClientError("User ID should be a number");
    }

    const userEntity = await this.userRepository.getById(id);

    if (!userEntity) {
      throw new ClientError("User with ID " + id + " not found");
    }
    return {
      id: userEntity.id,
      name: userEntity.name,
    };
  }
}
