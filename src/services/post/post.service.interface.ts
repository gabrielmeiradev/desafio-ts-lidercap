export type GetPostsDTO = {
  postId: number;
  title: string;
}[];

export interface PostServiceInterface {
  listByUserId(userId: number): Promise<GetPostsDTO>;
}
