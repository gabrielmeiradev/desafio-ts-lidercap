import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";

const router = Router();
const commentsController = CommentController.build();

router.get("/:postId/comments", commentsController.getByPostId);

export default router;
