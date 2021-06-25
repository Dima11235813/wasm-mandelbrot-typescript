export const timeExecution = (fn: Function) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    return end - start;
}