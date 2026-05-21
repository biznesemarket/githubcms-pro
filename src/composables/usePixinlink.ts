export interface PixinlinkImageOptions {
  width: number;
  height: number;
  bg?: string;
  fg?: string;
  prompt: string;
  style?: string;
  watermark?: boolean;
  seed?: number;
}

export interface PixinlinkValidationResult {
  valid: boolean;
  errors: string[];
  normalized?: string;
}

const BASE_URL = "https://pixinlink.ru/api/v1";
const VALID_STYLES = ["realistic", "artistic", "minimal", "3d"];
const MIN_WIDTH = 320;
const MAX_WIDTH = 2400;
const MIN_HEIGHT = 180;
const MAX_HEIGHT = 2400;

function cleanHex(value: string): string {
  return value.replace(/^#/, "").toLowerCase();
}

export function buildUrl(options: PixinlinkImageOptions): string {
  const width = options.width;
  const height = options.height;

  if (width < MIN_WIDTH || width > MAX_WIDTH) {
    throw new Error(`Width must be between ${MIN_WIDTH} and ${MAX_WIDTH}, got ${width}`);
  }
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
    throw new Error(`Height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT}, got ${height}`);
  }

  const bg = cleanHex(options.bg ?? "fff");
  const fg = cleanHex(options.fg ?? "111");
  const style = options.style ?? "realistic";

  const params = new URLSearchParams();
  params.set("prompt", options.prompt);
  params.set("style", style);
  params.set("watermark", String(options.watermark ?? false));

  if (typeof options.seed === "number") {
    params.set("seed", String(options.seed));
  }

  return `${BASE_URL}/${width}x${height}/${bg}/${fg}?${params.toString()}`;
}

export function normalizeUrl(raw: string): string | null {
  try {
    const url = new URL(raw);

    if (url.hostname !== "pixinlink.ru" && !url.hostname.endsWith(".pixinlink.ru")) {
      return null;
    }

    const pathParts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");

    // Strip /api/v1/ prefix if present
    const hasApiPrefix = pathParts[0] === "api" && pathParts[1] === "v1";
    const parts = hasApiPrefix ? pathParts.slice(2) : pathParts;

    if (parts.length !== 3) return null;

    const sizeMatch = parts[0].match(/^(\d+)x(\d+)$/i);
    if (!sizeMatch) return null;

    const width = Number.parseInt(sizeMatch[1], 10);
    const height = Number.parseInt(sizeMatch[2], 10);

    if (width < MIN_WIDTH || width > MAX_WIDTH) return null;
    if (height < MIN_HEIGHT || height > MAX_HEIGHT) return null;

    const bg = cleanHex(parts[1]);
    const fg = cleanHex(parts[2]);

    if (!/^[0-9a-f]{3,6}$/.test(bg)) return null;
    if (!/^[0-9a-f]{3,6}$/.test(fg)) return null;

    const prompt = url.searchParams.get("prompt");
    if (!prompt) return null;

    const style = url.searchParams.get("style") ?? "realistic";
    if (!VALID_STYLES.includes(style)) return null;

    const watermark = url.searchParams.get("watermark") ?? "false";
    const seed = url.searchParams.get("seed");

    const normalizedParams = new URLSearchParams();
    normalizedParams.set("prompt", prompt);
    normalizedParams.set("style", style);
    normalizedParams.set("watermark", watermark);

    if (seed !== null) {
      normalizedParams.set("seed", seed);
    }

    return `${BASE_URL}/${width}x${height}/${bg}/${fg}?${normalizedParams.toString()}`;
  } catch {
    return null;
  }
}

export function validateUrl(raw: string): PixinlinkValidationResult {
  const errors: string[] = [];

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { valid: false, errors: ["Invalid URL syntax"] };
  }

  if (url.hostname !== "pixinlink.ru" && !url.hostname.endsWith(".pixinlink.ru")) {
    errors.push("Hostname must be pixinlink.ru");
  }

  const pathParts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");

  // Strip /api/v1/ prefix if present
  const hasApiPrefix = pathParts[0] === "api" && pathParts[1] === "v1";
  const parts = hasApiPrefix ? pathParts.slice(2) : pathParts;

  if (parts.length !== 3) {
    errors.push(`Path must have exactly 3 segments after api/v1: /{width}x{height}/{bg}/{fg}`);
  } else {
    const sizeMatch = parts[0].match(/^(\d+)x(\d+)$/);
    if (!sizeMatch) {
      errors.push("First path segment must be {width}x{height} (lowercase x)");
    } else {
      const width = Number.parseInt(sizeMatch[1], 10);
      const height = Number.parseInt(sizeMatch[2], 10);

      if (width < MIN_WIDTH || width > MAX_WIDTH) {
        errors.push(`Width must be ${MIN_WIDTH}-${MAX_WIDTH}, got ${width}`);
      }
      if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
        errors.push(`Height must be ${MIN_HEIGHT}-${MAX_HEIGHT}, got ${height}`);
      }
    }

    if (parts[0] !== parts[0].toLowerCase()) {
      errors.push("Size segment must use lowercase x");
    }

    if (parts[1].startsWith("#") || parts[2].startsWith("#")) {
      errors.push("Hex colors must not include # prefix");
    }

    if (!/^[0-9a-f]{3,6}$/.test(cleanHex(parts[1]))) {
      errors.push("Background must be 3 or 6 lowercase hex chars");
    }
    if (!/^[0-9a-f]{3,6}$/.test(cleanHex(parts[2]))) {
      errors.push("Foreground must be 3 or 6 lowercase hex chars");
    }
  }

  const prompt = url.searchParams.get("prompt");
  if (!prompt) {
    errors.push("Missing required query parameter: prompt");
  } else {
    if (decodeURIComponent(prompt).length < 1 || decodeURIComponent(prompt).length > 800) {
      errors.push("Decoded prompt must be 1-800 characters");
    }
    if (/api_key|token|signature|secret|PIXINLINK_API_KEY/i.test(prompt)) {
      errors.push("Prompt must not contain API keys, tokens, or secrets");
    }
  }

  const style = url.searchParams.get("style");
  if (style && !VALID_STYLES.includes(style)) {
    errors.push(`Style must be one of: ${VALID_STYLES.join(", ")}`);
  }

  const forbiddenParams = Array.from(url.searchParams.keys()).filter(
    (key) => !["prompt", "style", "watermark", "seed"].includes(key),
  );
  if (forbiddenParams.length > 0) {
    errors.push(`Unknown query parameters: ${forbiddenParams.join(", ")}`);
  }

  const seed = url.searchParams.get("seed");
  if (seed !== null) {
    const seedNum = Number.parseInt(seed, 10);
    if (Number.isNaN(seedNum) || seedNum < 0 || seedNum > 2147483647) {
      errors.push("Seed must be 0-2147483647");
    }
  }

  const normalized = errors.length === 0 ? normalizeUrl(raw) : undefined;

  return {
    valid: errors.length === 0,
    errors,
    normalized: normalized ?? undefined,
  };
}

export function usePixinlink() {
  return {
    buildUrl,
    normalizeUrl,
    validateUrl,
  };
}
