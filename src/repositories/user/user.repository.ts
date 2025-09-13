import { User } from "../../entities/user.entity";

export interface UserRepository {
  getById(id: number): Promise<User | null>;
}
