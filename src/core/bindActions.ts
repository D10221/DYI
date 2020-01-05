// FIXME: types!
/**
 * Bind Action Creators 
 * @param actions 
 */
const bindActions = <T, K extends keyof T>(
  actions: { [key in K]: T[key] & Function },
) => (dispatch: (...args: any[]) => any) => {
  const combine = (out: T, key: K) => ({
    ...out,
    [key]: (...args: any[]) => dispatch(actions[key](...args)),
  });
  return Object.keys(actions).reduce(combine as any, {} as T);
};

export default bindActions;