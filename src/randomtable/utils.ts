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

export function parseRollExpression(s: string): number[] {
    if (s == "G") {
        return [12]
    }

    if (s == "E") {
        return [11]
    }

    if (s.includes("-")) {
        const parts = s.split("-")
        if (parts.length == 2) {
            const first = Number.parseInt(parts[0])
            const second = Number.parseInt(parts[1])
            if (first && second && first < second) {
                const range: number[] = [];
                for (let i = first; i <= second; i++) {
                    range.push(i)
                }
                return range
            }
        }
    } else {
        const n = Number.parseInt(s);
        if (n) {
            return [n];
        }
    }

    return [];
}

export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

