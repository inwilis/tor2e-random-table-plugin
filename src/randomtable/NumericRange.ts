export class NumericRange {
    readonly from: number
    readonly to: number

    constructor(s: string) {
        if (s.includes("-")) {
            const parts = s.split("-").map(s => s.trim()).filter(s => s)
            if (parts.length == 2) {
                const first = Number.parseInt(parts[0])
                const second = Number.parseInt(parts[1])
                if (first && second && first <= second) {
                    this.from = first
                    this.to = second
                } else {
                    throw new Error(`Unable to parse "${s}" as a range. Correct range must contain two numbers, of which first must not be greater than the second.`)
                }
            } else {
                throw new Error(`Unable to parse "${s}" as a range. Correct range must contain two numbers, of which first must not be greater than the second.`)
            }
        } else {
            const n = Number.parseInt(s);
            if (n) {
                this.from = n
                this.to = n
            } else {
                throw new Error(`Unable to parse "${s}" as a number.`)
            }
        }
    }

    includes(n: number): boolean {
        return this.from <= n && n <= this.to
    }

    intersects(other: NumericRange) {
        return this.includes(other.from) || this.includes(other.to) || other.includes(this.from) || other.includes(this.to)
    }

    toString(): string {
        return (this.from == this.to) ? `${this.from}` : `${this.from}-${this.to}`
    }

}
