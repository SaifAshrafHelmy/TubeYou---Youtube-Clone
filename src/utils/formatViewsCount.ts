const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
});
export function formatView(viewsCount: number) {
  return VIEW_FORMATTER.format(viewsCount);
}
