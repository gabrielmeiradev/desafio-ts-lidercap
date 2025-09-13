import { ClientError } from "../../errors/client.error";
import { CommentRepository } from "../../repositories/comment/comment.repository";
import {
  CommentServiceInterface,
  GetCommentsDTO,
} from "./comment.service.interface";

export class CommentService implements CommentServiceInterface {
  private constructor(readonly repository: CommentRepository) {}

  static build(repository: CommentRepository) {
    return new CommentService(repository);
  }

  async listByPostId(postId: number): Promise<GetCommentsDTO> {
    if (Number.isNaN(postId)) {
      throw new ClientError("Post ID should be a number");
    }

    const commentsEntities = await this.repository.listByPostId(postId);

    const comments: GetCommentsDTO = commentsEntities.map((c) => {
      return {
        commentId: c.id,
        text: c.text,
      };
    });

    return comments;
  }
}
