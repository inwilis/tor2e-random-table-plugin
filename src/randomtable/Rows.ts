import {ensureArraySizeInPlace} from "./utils";

export class Rows {
    readonly rows: string[][]
    readonly columnsCount: number

    constructor(rows: string[]) {
        this.rows = []

        let columnsCount = 0

        rows.forEach((row, i) => {
            if (row) {
                const rowArray = row.split("|").map(s => s.trim()).filter(s => s)
                if (Array.isArray(rowArray) && rowArray.length > 0) {
                    this.rows.push(rowArray)
                    columnsCount = Math.max(columnsCount, rowArray.length)

                } else {
                    throw new Error(`Row ${i+1} is empty`)
                }
            } else {
                throw new Error(`Row ${i+1} is empty`)
            }
        })

        this.columnsCount = columnsCount
        this.rows.forEach(row => ensureArraySizeInPlace(row, this.columnsCount))
    }

    length(): number {
        return this.rows.length
    }
}
