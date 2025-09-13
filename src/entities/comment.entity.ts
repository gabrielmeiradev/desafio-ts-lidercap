import { getRandomInt } from "../utils/random.util";

export type commentProps = {
  commentId: number;
  postId: number;
  text: string;
};

export class Comment {
  private constructor(readonly props: commentProps) {}

  public static create(text: string, postId: number): Comment {
    return new Comment({
      commentId: getRandomInt(),
      postId,
      text,
    });
  }

  public static with(commentId: number, postId: number, text: string) {
    return new Comment({
      commentId,
      postId,
      text,
    });
  }

  public get id() {
    return this.props.commentId;
  }

  public get text() {
    return this.props.text;
  }

  public get postId() {
    return this.props.postId;
  }
}
