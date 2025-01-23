import {
  formatTime,
  formatFileSize,
  formatTranscriptionText,
} from "../../src/utils/formatters";

describe("formatters", () => {
  describe("formatTime", () => {
    test("formats seconds to MM:SS", () => {
      expect(formatTime(61)).toBe("01:01");
      expect(formatTime(3600)).toBe("60:00");
      expect(formatTime(0)).toBe("00:00");
    });
  });

  describe("formatFileSize", () => {
    test("formats bytes to human readable size", () => {
      expect(formatFileSize(1024)).toBe("1.00 KB");
      expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      expect(formatFileSize(0)).toBe("0 Bytes");
    });
  });

  describe("formatTranscriptionText", () => {
    test("cleans up whitespace in text", () => {
      expect(formatTranscriptionText("  test  text\n\n")).toBe("test text\n");
      expect(formatTranscriptionText("multiple    spaces")).toBe(
        "multiple spaces"
      );
    });
  });
});
