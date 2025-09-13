import { Request, Response } from "express";
import { UserRepositoryLocal } from "../repositories/user/local/user.repository.local";
import { UserService } from "../services/user/user.service";
import { PostRepositoryLocal } from "../repositories/post/local/post.repository.local";
import { PostService } from "../services/post/post.service";
import { CommentRepositoryLocal } from "../repositories/comment/local/comment.repository.local";
import { CommentService } from "../services/comment/comment.service";
import { GetFullUserDTO } from "../services/user/user.service.interface";
import errorHandler from "../handlers/error.handler";

export class UserController {
  private constructor() {}

  static build() {
    return new UserController();
  }

  async getById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const repo = UserRepositoryLocal.build();
      const service = UserService.build(repo);

      const user = await service.get(parseInt(userId));

      return res.status(200).json(user);
    } catch (e) {
      errorHandler(e as Error, res);
    }
  }

  async getFullById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const userRepo = UserRepositoryLocal.build();
      const userService = UserService.build(userRepo);

      const postsRepo = PostRepositoryLocal.build();
      const postService = PostService.build(postsRepo);

      const commentsRepo = CommentRepositoryLocal.build();
      const commentsService = CommentService.build(commentsRepo);

      const user = await userService.get(parseInt(userId));
      const posts = await postService.listByUserId(parseInt(userId));

      const commentsOnFirstPost =
        posts.length > 0
          ? await commentsService.listByPostId(posts[0].postId)
          : [];

      const response: GetFullUserDTO = {
        user,
        posts,
        commentsOnFirstPost,
      };

      return res.status(200).json(response);
    } catch (e) {
      errorHandler(e as Error, res);
    }
  }
}
