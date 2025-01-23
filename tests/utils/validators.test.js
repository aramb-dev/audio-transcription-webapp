import {
  validateFileSize,
  validateFileType,
  validateUrl,
} from "../../src/utils/validators";
import { CONFIG } from "../../src/constants/config";

describe("validators", () => {
  describe("validateFileSize", () => {
    test("accepts files under size limit", () => {
      const file = { size: CONFIG.MAX_FILE_SIZE - 1000 };
      expect(validateFileSize(file)).toBe(true);
    });

    test("rejects files over size limit", () => {
      const file = { size: CONFIG.MAX_FILE_SIZE + 1000 };
      expect(() => validateFileSize(file)).toThrow();
    });
  });

  describe("validateFileType", () => {
    test("accepts supported file types", () => {
      const file = { type: "audio/mpeg" };
      expect(validateFileType(file)).toBe(true);
    });

    test("rejects unsupported file types", () => {
      const file = { type: "image/jpeg" };
      expect(() => validateFileType(file)).toThrow();
    });
  });

  describe("validateUrl", () => {
    test("accepts valid URLs", () => {
      expect(validateUrl("https://example.com")).toBe(true);
    });

    test("rejects invalid URLs", () => {
      expect(() => validateUrl("not-a-url")).toThrow();
    });
  });
});
