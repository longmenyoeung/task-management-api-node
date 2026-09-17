import { describe, it, expect } from "vitest";
import ApiError from "../../src/utils/ApiError.js"; // Ensure this relative path accurately points to your utility file

describe("ApiError Utility Unit Tests", () => {
    it("should create a custom API error instance with correct properties", () => {
        const error = new ApiError(404, "Project not found");
        
        expect(error.message).toBe("Project not found");
        expect(error.statusCode).toBe(404);
        expect(error.success).toBe(false);
        expect(error.errors).toBeNull();
    });

    it("should carry custom error payload arrays safely", () => {
        const validationErrors = ["Email is invalid", "Password is too short"];
        const error = new ApiError(400, "Validation failed", validationErrors);
        
        expect(error.statusCode).toBe(400);
        expect(error.errors).toEqual(validationErrors);
        expect(error.errors).toHaveLength(2);
    });
});
