import { describe, it, expect, vi } from "vitest";
import ApiError from "../../src/utils/ApiError";
import authorizeRoles from "../../src/middleware/Authorizerole";

describe("authorizeRoles middleware", () => {

    it("should return 403 when user has no role", () => {

        const req = {
            user: {}
        };

        const res = {};

        const next = vi.fn();

        authorizeRoles("admin")(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0];

        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe(
            "Access denied: No role provided."
        );
    });


    it("should return 403 when user does not have permission", () => {

        const req = {
            user: {
                role: "user"
            }
        };

        const res = {};

        const next = vi.fn();

        authorizeRoles("admin")(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0];

        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe(
            "Access denied: Insufficient permissions."
        );
    });


    it("should allow the request when user has an allowed role", () => {

        const req = {
            user: {
                role: "admin"
            }
        };

        const res = {};

        const next = vi.fn();

        authorizeRoles("admin")(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        expect(next).toHaveBeenCalledWith();
    });


});