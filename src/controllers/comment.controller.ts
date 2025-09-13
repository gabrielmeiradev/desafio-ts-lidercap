import { Request, Response } from "express";
import { CommentRepositoryLocal } from "../repositories/comment/local/comment.repository.local";
import { CommentService } from "../services/comment/comment.service";
import errorHandler from "../handlers/error.handler";

export class CommentController {
  private constructor() {}

  static build() {
    return new CommentController();
  }

  async getByPostId(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const repo = CommentRepositoryLocal.build();
      const service = CommentService.build(repo);

      const comments = await service.listByPostId(parseInt(postId));

      return res.status(200).json(comments);
    } catch (e) {
      errorHandler(e as Error, res);
    }
  }
}
