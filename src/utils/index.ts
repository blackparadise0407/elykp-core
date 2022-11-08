export function get(obj: any, keys?: string | string[], defaultVal?: any): any {
  if (!keys) return undefined;
  const keysArray = Array.isArray(keys) ? keys : keys.match(/([^[.\]])+/g);
  const result = keysArray?.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj,
  );
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defaultVal : result;
}
