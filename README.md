# @golden-tiger/js-runner

JavaScript Runner

```
export declare function run({ code, lexicalEnvironment, executeContext, }: {
    code: string;
    lexicalEnvironment?: any;
    executeContext?: any;
}): Promise<{
    result: any;
    duration: number;
}>;
```
