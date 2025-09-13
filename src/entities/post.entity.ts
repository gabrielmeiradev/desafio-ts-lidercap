import { getRandomInt } from "../utils/random.util";

export type postProps = {
  postId: number;
  userId: number;
  title: string;
};

export class Post {
  private constructor(readonly props: postProps) {}

  public static create(userId: number, title: string) {
    return new Post({
      postId: getRandomInt(),
      userId,
      title,
    });
  }

  public static with(postId: number, userId: number, title: string) {
    return new Post({
      postId,
      userId,
      title,
    });
  }

  public get id() {
    return this.props.postId;
  }

  public get title() {
    return this.props.title;
  }

  public get userId() {
    return this.props.userId;
  }
}
