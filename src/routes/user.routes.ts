import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { PostController } from "../controllers/post.controller";

const router = Router();
const userController = UserController.build();
const postController = PostController.build();

router.get("/:userId/full", userController.getFullById);
router.get("/:userId/posts", postController.getByUserId);
router.get("/:userId", userController.getById);

export default router;
