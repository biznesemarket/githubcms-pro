export interface ImageInput {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: string;
  loading: "lazy" | "eager";
}

function extractPixinlinkSize(src: string): { width: number; height: number } | null {
  const match = src.match(/pixinlink\.(?:com|ru)(?:\/api\/v1)?\/(\d+)x(\d+)/i);
  if (!match) return null;
  return {
    width: Number.parseInt(match[1], 10),
    height: Number.parseInt(match[2], 10),
  };
}

function extractPixinlinkColors(src: string): { bg: string; fg: string } {
  const match = src.match(/pixinlink\.(?:com|ru)(?:\/api\/v1)?\/\d+x\d+\/([0-9a-f]{3,6})\/([0-9a-f]{3,6})/i);
  if (!match) return { bg: "f7f8fb", fg: "d8dde8" };
  return { bg: match[1], fg: match[2] };
}

export function useImages(input: ImageInput): ImageProps {
  const src = input.src;
  const alt = input.alt ?? "";
  const pixinlinkSize = extractPixinlinkSize(src);

  const width = input.width ?? pixinlinkSize?.width ?? 1200;
  const height = input.height ?? pixinlinkSize?.height ?? 630;

  let placeholder: string;
  const colors = extractPixinlinkColors(src);
  placeholder = `#${colors.bg}`;

  return {
    src,
    alt,
    width,
    height,
    placeholder,
    loading: "lazy",
  };
}
