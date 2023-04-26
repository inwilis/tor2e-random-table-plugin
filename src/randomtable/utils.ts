export function ensureArraySize(array: string[], size: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < size; i++) {
        result.push(i < array.length ? array[i] : "")
    }

    return result
}

export function ensureArraySizeInPlace(array: string[], size: number) {
    if (array.length < size) {
        for (let i = array.length; i < size; i++) {
            array.push("")
        }
    } else if (array.length > size) {
        for (let i = array.length; i > size; i--) {
            array.pop()
        }
    }
}

