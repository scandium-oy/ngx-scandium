// eslint-disable-next-line @typescript-eslint/ban-types
export const memo = <T extends Function>(fnToMemoize: T): (...newArgs: any[]) => T => {
  let prevArgs = [{}];
  let result: T;

  const func = (...newArgs: any[]) => {
    if (hasDifferentArgs(prevArgs, newArgs)) {
      result = fnToMemoize(...newArgs);
      prevArgs = newArgs;
    }
    return result;
  };
  return func;
};

const hasDifferentArgs = (prev: unknown[], next: unknown[]): boolean => {
  if (prev.length !== next.length) {
    return true;
  }
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) {
      return true;
    }
  }
  return false;
};
