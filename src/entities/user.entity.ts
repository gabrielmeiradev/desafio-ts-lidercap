import { getRandomInt } from "../utils/random.util";

export type userProps = {
  id: number;
  name: string;
};

export class User {
  private constructor(readonly props: userProps) {}

  public static create(name: string) {
    return new User({
      id: getRandomInt(),
      name: name,
    });
  }

  public static with(id: number, name: string) {
    return new User({
      id,
      name,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }
}
