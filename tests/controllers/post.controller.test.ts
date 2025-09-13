import { PostController } from "../../src/controllers/post.controller";
import { Request, Response } from "express";
import { PostService } from "../../src/services/post/post.service";
import errorHandler from "../../src/handlers/error.handler";
jest.mock("../../src/handlers/error.handler", () => jest.fn());

describe("PostController", () => {
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

  it("should return posts for a user", async () => {
    const listByUserIdMock = jest
      .fn()
      .mockResolvedValue([{ id: 1, title: "Test post" }]);
    // type removed, not needed
    jest
      .spyOn(PostService, "build")
      .mockReturnValue({
        listByUserId: listByUserIdMock,
        repository: {},
      } as unknown as PostService);

    const controller = PostController.build();
    await controller.getByUserId(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith([{ id: 1, title: "Test post" }]);
  });

  it("should handle errors", async () => {
    const listByUserIdMock = jest
      .fn()
      .mockRejectedValue(new Error("Test error"));
    // type removed, not needed
    jest
      .spyOn(PostService, "build")
      .mockReturnValue({
        listByUserId: listByUserIdMock,
        repository: {},
      } as unknown as PostService);
    const errorHandlerMock = errorHandler as jest.Mock;

    const controller = PostController.build();
    await controller.getByUserId(req as Request, res as Response);
    expect(errorHandlerMock).toHaveBeenCalled();
  });
});
