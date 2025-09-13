import { Comment } from "../../entities/comment.entity";

export interface CommentRepository {
  listByPostId(postId: number): Promise<Comment[]>;
}
