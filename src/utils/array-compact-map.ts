export function compactMap<T,O>(array: T[], transform: (e: T, index: number, array: T[]) => O | undefined): O[] {
    const res: O[] = [];
    let out: O | undefined;
    for(let i = 0; i < array.length; i++) {
        out = transform(array[i], i, array);
        if(out !== undefined) {
            res.push(out);
        }
    }
    return res;
}
