import { describe, it, expect, vi } from "vitest";
import { validationResult } from "express-validator";
import { validate } from "../../src/middleware/Validation.js";

vi.mock("express-validator", () => ({
    validationResult: vi.fn()
}));

describe("validate middleware", () => {

    it("should call next when there are no validation errors", () => {

        validationResult.mockReturnValue({
            isEmpty: () => true
        });

        const req = {};
        const res = {};
        const next = vi.fn();

        validate(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });


    it("should return 400 when validation fails", () => {

        validationResult.mockReturnValue({
            isEmpty: () => false,

            array: () => [
                {
                    path: "email",
                    msg: "Invalid email"
                }
            ]
        });

        const req = {};

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();

        validate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            errors: [
                {
                    field: "email",
                    message: "Invalid email"
                }
            ]
        });

        expect(next).not.toHaveBeenCalled();
    });

});