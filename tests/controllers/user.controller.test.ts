import { UserController } from "../../src/controllers/user.controller";
import { Request, Response } from "express";
import { UserService } from "../../src/services/user/user.service";
import { PostService } from "../../src/services/post/post.service";
import { CommentService } from "../../src/services/comment/comment.service";
import errorHandler from "../../src/handlers/error.handler";
jest.mock("../../src/handlers/error.handler", () => jest.fn());

describe("UserController", () => {
  let req: Partial<Request>;
  let res: Response;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { params: { userId: "1" } };
    res = { status: statusMock, json: jsonMock } as unknown as Response;
    jest.clearAllMocks();
  });

  it("should return user by id", async () => {
    const getMock = jest.fn().mockResolvedValue({ id: 1, name: "Test user" });
    jest
      .spyOn(UserService, "build")
      .mockReturnValue({
        get: getMock,
        repository: {},
      } as unknown as UserService);

    const controller = UserController.build();
    await controller.getById(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: 1, name: "Test user" });
  });

  it("should handle errors in getById", async () => {
    const getMock = jest.fn().mockRejectedValue(new Error("Test error"));
    jest
      .spyOn(UserService, "build")
      .mockReturnValue({
        get: getMock,
        repository: {},
      } as unknown as UserService);
    const errorHandlerMock = errorHandler as jest.Mock;

    const controller = UserController.build();
    await controller.getById(req as Request, res as Response);
    expect(errorHandlerMock).toHaveBeenCalled();
  });

  it("should return full user by id", async () => {
    const getMock = jest.fn().mockResolvedValue({ id: 1, name: "Test user" });
    jest
      .spyOn(UserService, "build")
      .mockReturnValue({
        get: getMock,
        repository: {},
      } as unknown as UserService);
    const listByUserIdMock = jest
      .fn()
      .mockResolvedValue([{ postId: 1, title: "Test post" }]);
    jest
      .spyOn(PostService, "build")
      .mockReturnValue({
        listByUserId: listByUserIdMock,
        repository: {},
      } as unknown as PostService);
    const listByPostIdMock = jest
      .fn()
      .mockResolvedValue([{ id: 1, text: "Test comment" }]);
    jest
      .spyOn(CommentService, "build")
      .mockReturnValue({
        listByPostId: listByPostIdMock,
        repository: {},
      } as unknown as CommentService);

    const controller = UserController.build();
    await controller.getFullById(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      user: { id: 1, name: "Test user" },
      posts: [{ postId: 1, title: "Test post" }],
      commentsOnFirstPost: [{ id: 1, text: "Test comment" }],
    });
  });

  it("should handle errors in getFullById", async () => {
    const getMock = jest.fn().mockRejectedValue(new Error("Test error"));
    jest
      .spyOn(UserService, "build")
      .mockReturnValue({
        get: getMock,
        repository: {},
      } as unknown as UserService);
    const errorHandlerMock = errorHandler as jest.Mock;

    const controller = UserController.build();
    await controller.getFullById(req as Request, res as Response);
    expect(errorHandlerMock).toHaveBeenCalled();
  });
});
