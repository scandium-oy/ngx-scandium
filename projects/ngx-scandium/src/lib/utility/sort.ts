
export const fieldSorter = (fields: string[]) => (a: any, b: any) =>
  fields
    .map((o) => {
      let dir = 1;
      if (o[0] === '-') {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

export const sortDate = (a: any, b: any, key: string): number => {
  if (a[key] == null && b[key] == null) {
    return 0;
  }
  if (a[key] == null && b[key] != null) {
    return -1;
  }
  if (a[key] != null && b[key] == null) {
    return 1;
  }
  return a[key].getTime() < b[key].getTime() ? -1 : 1;
};
