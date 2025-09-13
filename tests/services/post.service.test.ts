import { ClientError } from "../../src/errors/client.error";
import { PostService } from "../../src/services/post/post.service";

describe("PostService", () => {
  const mockRepository = {
    listByUserId: jest.fn(),
  };

  const service = PostService.build(mockRepository);

  it("should throw ClientError if userId is NaN", async () => {
    await expect(service.listByUserId(NaN)).rejects.toThrow(ClientError);
    await expect(service.listByUserId(NaN)).rejects.toThrow(
      "User ID should be a number"
    );
  });

  it("should return posts mapped correctly", async () => {
    mockRepository.listByUserId.mockResolvedValue([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ]);

    const result = await service.listByUserId(42);

    expect(mockRepository.listByUserId).toHaveBeenCalledWith(42);
    expect(result).toEqual([
      { postId: 1, title: "Post 1" },
      { postId: 2, title: "Post 2" },
    ]);
  });
});
