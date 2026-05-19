export function buildComparePath(
  pairId: string,
  options?: { fromMedia?: string; fromProtocol?: string },
): string {
  const params = new URLSearchParams({ pair: pairId });
  if (options?.fromMedia) params.set("from", options.fromMedia);
  if (options?.fromProtocol) params.set("fromProtocol", options.fromProtocol);
  return `/compare?${params.toString()}`;
}
