import { ClientError } from "../../src/errors/client.error";
import { UserService } from "../../src/services/user/user.service";

describe("UserService", () => {
  const mockRepository = {
    getById: jest.fn(),
  };

  const service = UserService.build(mockRepository);

  it("should throw ClientError if userId is NaN", async () => {
    await expect(service.get(NaN)).rejects.toThrow(ClientError);
    await expect(service.get(NaN)).rejects.toThrow(
      "User ID should be a number"
    );
  });

  it("should throw ClientError if user is not found", async () => {
    mockRepository.getById.mockResolvedValue(null);

    await expect(service.get(1)).rejects.toThrow(ClientError);
    await expect(service.get(1)).rejects.toThrow("User with ID 1 not found");
  });

  it("should return user mapped correctly", async () => {
    mockRepository.getById.mockResolvedValue({ id: 1, name: "Alice" });

    const result = await service.get(1);

    expect(mockRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: "Alice" });
  });
});
