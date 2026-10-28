export const clampPage = (page: number, pages: number): number =>
  Math.min(Math.max(page, 1), Math.max(pages, 1));
