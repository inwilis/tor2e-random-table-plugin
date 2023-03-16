import {NumericRange} from "./NumericRange";

export class RollResults {

    readonly ranges: NumericRange[]
    readonly minRoll: number
    readonly maxRoll: number

    constructor(rows: string[][], rollResultTransformer: ((s: string) => string) | null) {

        const _ranges: NumericRange[] = []
        let _minRoll: number = Number.MAX_VALUE
        let _maxRoll: number = Number.MIN_VALUE

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.length > 0) {
                const range = new NumericRange(rollResultTransformer ? rollResultTransformer(row[0]) : row[0]);
                    const intersectingRow = _ranges.findIndex((element) => element.intersects(range));
                    if (intersectingRow > -1) {
                        throw new Error(`Roll results for rows ${intersectingRow + 1} and ${i + 1} are intersecting`)
                    }
                    _ranges.push(range)
                    _minRoll = Math.min(_minRoll, range.from)
                    _maxRoll = Math.max(_maxRoll, range.to)

            } else {
                throw new Error(`Row ${i + 1} is empty"`)
            }
        }

        RollResults.validateRanges(_ranges)

        this.ranges = _ranges
        this.minRoll = _minRoll
        this.maxRoll = _maxRoll

    }

    static validateRanges(ranges: NumericRange[]) {

        if (ranges.length < 1) {
            throw new Error("No ranges were parsed")
        }

        const _ranges: NumericRange[] = []
        _ranges.push(...ranges)
        _ranges.sort((a, b) => {
            if (a.from < b.from) {
                return -1
            } else if (a.from > b.from) {
                return 1
            } else {
                return 0
            }
        })

        for (let i = 0; i < _ranges.length - 1; i++) {
            if (_ranges[i].to + 1 < _ranges[i + 1].from) {
                throw new Error("Roll results are not covering whole range of possible results")
            }
        }
    }
}

