export function cleanData(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      return value !== null && value !== '' && value !== undefined;
    })
  );
}
