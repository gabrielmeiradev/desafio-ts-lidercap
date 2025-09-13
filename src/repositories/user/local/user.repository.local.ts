import { User } from "../../../entities/user.entity";
import { delay } from "../../../utils/delay.util";
import { UserRepository } from "../user.repository";

export class UserRepositoryLocal implements UserRepository {
  private constructor() {}

  static build() {
    return new UserRepositoryLocal();
  }

  private users: User[] = [User.with(1, "Alice"), User.with(2, "Bob")];

  async getById(id: number): Promise<User | null> {
    await delay(1000);
    const user = this.users.find((u) => u.id == id);
    if (!user) return null;
    return user;
  }
}
