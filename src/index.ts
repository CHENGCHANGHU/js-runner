export async function run(
  {
    code,
    lexicalEnvironment = {},
    executeContext = this,
  }: {
    code: string,
    lexicalEnvironment?: any;
    executeContext?: any;
  }) {
  const { keys, values } = Object.entries(lexicalEnvironment)
    .reduce((acc, [k, v]) => {
      acc.keys.push(k);
      acc.values.push(v);
      return acc;
    }, {
      keys: [],
      values: [],
    });
  
  // AsyncFunction is not a global object. It can be obtained with the following code: const AsyncFunction = async function () {}.constructor;
  // const wrappedFunction = (new Function(...keys, code)).bind(executeContext, ...values);
  // const AsyncFunction = (async function () {}).constructor as any;
  // const wrappedFunction = (new AsyncFunction(...keys, code)).bind(executeContext, ...values);
  const wrappedFunction = (new Function(...keys, `return async () => {${code}};`)).bind(executeContext, ...values)();
  const startTime = performance.now();
  
  let result;
  try {
    result = wrappedFunction();
  } catch (e) {
    console.error(e);
  }

  const endTime = performance.now();
  return {
    result,
    duration: endTime - startTime,
  };
}
