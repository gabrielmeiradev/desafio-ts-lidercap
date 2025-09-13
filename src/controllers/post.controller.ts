import { Request, Response } from "express";
import { PostRepositoryLocal } from "../repositories/post/local/post.repository.local";
import { PostService } from "../services/post/post.service";
import errorHandler from "../handlers/error.handler";

export class PostController {
  private constructor() {}

  static build() {
    return new PostController();
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const repo = PostRepositoryLocal.build();
      const service = PostService.build(repo);

      const post = await service.listByUserId(parseInt(userId));

      return res.status(200).json(post);
    } catch (e) {
      errorHandler(e as Error, res);
    }
  }
}
