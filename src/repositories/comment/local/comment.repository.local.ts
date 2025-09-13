import { Comment } from "../../../entities/comment.entity";
import { delay } from "../../../utils/delay.util";
import { CommentRepository } from "../comment.repository";

export class CommentRepositoryLocal implements CommentRepository {
  private constructor() {}

  static build() {
    return new CommentRepositoryLocal();
  }

  private comments: Comment[] = [
    Comment.with(1, 101, "Great post!"),
    Comment.with(2, 101, "Very insightful."),
    Comment.with(3, 102, "Amazing pictures!"),
    Comment.with(4, 201, "Tried your recipe, it was delicious!"),
  ];

  async listByPostId(postId: number) {
    await delay(1000);
    return this.comments.filter((p) => p.postId == postId);
  }
}
