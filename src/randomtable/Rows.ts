import {ensureArraySizeInPlace, parseRollExpression} from "./utils";

export class Rows {
    readonly rows: string[][]
    readonly rollsForRows: number[][]

    readonly columnsCount: number

    readonly minRoll: number
    readonly maxRoll: number

    constructor(rows: string[]) {
        this.rows = []
        this.rollsForRows = []

        let columnsCount = 0

        rows.forEach((row, i) => {
            if (row) {
                const rowArray = row.split("|");
                if (Array.isArray(rowArray) && rowArray.length > 0) {
                    this.rows.push(rowArray)
                    columnsCount = Math.max(columnsCount, rowArray.length)

                    const rollsForRow: number[] = parseRollExpression(rowArray[0]);
                    if (rollsForRow.length > 0) {
                        this.rollsForRows.push(rollsForRow)
                    } else {
                        this.rollsForRows.push([i+1])
                    }
                }
            }
        })

        this.columnsCount = columnsCount
        this.rows.forEach(row => ensureArraySizeInPlace(row, this.columnsCount))

        const allRollNumbers = new Set<number>()

        this.rollsForRows.flat().forEach(i => {
            if (allRollNumbers.has(i)) {
                throw new RangeError("Table specifies several rows for roll result = " + i)
            }
            allRollNumbers.add(i)
        })

        this.minRoll = Math.min(...allRollNumbers)
        this.maxRoll = Math.max(...allRollNumbers)

        // validation
        for (let i = this.minRoll; i <= this.maxRoll; i++) {
            if (!allRollNumbers.has(i)) {
                throw new RangeError("Table does not specify a row for roll result = " + i)
            }
        }
    }

    length(): number {
        return this.rows.length
    }
}
