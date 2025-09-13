import { GetCommentsDTO } from "../comment/comment.service.interface";
import { GetPostsDTO } from "../post/post.service.interface";

export type GetUserDTO = {
  id: number;
  name: string;
};

export type GetFullUserDTO = {
  user: GetUserDTO;
  posts: GetPostsDTO;
  commentsOnFirstPost: GetCommentsDTO;
};

export interface UserServiceInterface {
  get(id: number): Promise<GetUserDTO>;
}
