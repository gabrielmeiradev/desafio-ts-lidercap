export type GetCommentsDTO = {
  commentId: number;
  text: string;
}[];

export interface CommentServiceInterface {
  listByPostId(postId: number): Promise<GetCommentsDTO>;
}
