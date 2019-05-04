export {}

declare global {
    interface Array<T> {
        compactMap<T,O>(transform: (e: T, index: number, array: T[]) => O | undefined): O[];
    }
}

Array.prototype.compactMap = function<T,O>(transform: (e: T, index: number, array: T[]) => O | undefined): O[] {
    const res: O[] = [];
    let out: O;
    for(let i = 0; i < this.length; i++) {
        out = transform(this[i], i, this);
        if(out !== undefined) {
            res.push(out);
        }
    }
    return res;
};