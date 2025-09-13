import { Router } from "express";
import postsRouter from "./posts.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/posts", postsRouter);
router.use("/users", userRouter);

export default router;
