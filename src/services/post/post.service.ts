import { ClientError } from "../../errors/client.error";
import { PostRepository } from "../../repositories/post/post.repository";
import { GetPostsDTO, PostServiceInterface } from "./post.service.interface";

export class PostService implements PostServiceInterface {
  private constructor(readonly repository: PostRepository) {}

  static build(repository: PostRepository) {
    return new PostService(repository);
  }

  async listByUserId(userId: number): Promise<GetPostsDTO> {
    if (Number.isNaN(userId)) {
      throw new ClientError("User ID should be a number");
    }

    const postsEntities = await this.repository.listByUserId(userId);

    const posts: GetPostsDTO = postsEntities.map((p) => {
      return {
        postId: p.id,
        title: p.title,
      };
    });

    return posts;
  }
}
