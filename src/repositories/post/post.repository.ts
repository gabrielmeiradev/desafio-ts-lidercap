import { Post } from "../../entities/post.entity";

export interface PostRepository {
  listByUserId(userId: number): Promise<Post[]>;
}
