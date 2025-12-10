import { withBasePath } from "@/src/utils/basePath";

export function resolveImage(src: string) {
  return src.startsWith("http") ? src : withBasePath(src);
};