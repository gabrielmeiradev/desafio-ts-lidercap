import { Post } from "../../../entities/post.entity";
import { delay } from "../../../utils/delay.util";
import { PostRepository } from "../post.repository";

export class PostRepositoryLocal implements PostRepository {
  private constructor() {}

  static build() {
    return new PostRepositoryLocal();
  }

  private posts: Post[] = [
    Post.with(101, 1, "My first post"),
    Post.with(102, 1, "Travel photos"),
    Post.with(201, 2, "Cooking tips"),
  ];

  async listByUserId(userId: number) {
    await delay(1000);
    return this.posts.filter((u) => u.userId == userId);
  }
}
