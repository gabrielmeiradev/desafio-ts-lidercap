import { CommentController } from "../../src/controllers/comment.controller";
import { Request, Response } from "express";
import { CommentService } from "../../src/services/comment/comment.service";
import errorHandler from "../../src/handlers/error.handler";
jest.mock("../../src/handlers/error.handler", () => jest.fn());

describe("CommentController", () => {
  let req: Partial<Request>;
  let res: Response;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { params: { postId: "1" } };
    res = { status: statusMock, json: jsonMock } as unknown as Response;
    jest.clearAllMocks();
  });

  it("should return comments for a post", async () => {
    const listByPostIdMock = jest
      .fn()
      .mockResolvedValue([{ id: 1, text: "Test comment" }]);
    jest
      .spyOn(CommentService, "build")
      .mockReturnValue({
        listByPostId: listByPostIdMock,
        repository: {},
      } as unknown as CommentService);

    const controller = CommentController.build();
    await controller.getByPostId(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith([{ id: 1, text: "Test comment" }]);
  });

  it("should handle errors", async () => {
    const listByPostIdMock = jest
      .fn()
      .mockRejectedValue(new Error("Test error"));
    jest
      .spyOn(CommentService, "build")
      .mockReturnValue({
        listByPostId: listByPostIdMock,
        repository: {},
      } as unknown as CommentService);
    const errorHandlerMock = errorHandler as jest.Mock;

    const controller = CommentController.build();
    await controller.getByPostId(req as Request, res as Response);
    expect(errorHandlerMock).toHaveBeenCalled();
  });
});
