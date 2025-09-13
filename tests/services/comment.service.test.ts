import { ClientError } from "../../src/errors/client.error";
import { CommentService } from "../../src/services/comment/comment.service";

describe("CommentService", () => {
  const mockRepository = {
    listByPostId: jest.fn(),
  };

  const service = CommentService.build(mockRepository);

  it("should throw ClientError if postId is NaN", async () => {
    await expect(service.listByPostId(NaN)).rejects.toThrow(ClientError);
    await expect(service.listByPostId(NaN)).rejects.toThrow(
      "Post ID should be a number"
    );
  });

  it("should return comments mapped correctly", async () => {
    mockRepository.listByPostId.mockResolvedValue([
      { id: 1, text: "Comment 1" },
      { id: 2, text: "Comment 2" },
    ]);

    const result = await service.listByPostId(123);

    expect(mockRepository.listByPostId).toHaveBeenCalledWith(123);
    expect(result).toEqual([
      { commentId: 1, text: "Comment 1" },
      { commentId: 2, text: "Comment 2" },
    ]);
  });
});
