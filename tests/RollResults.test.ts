import {describe, expect, test} from "@jest/globals";
import {RollResults} from "../src/randomtable/RollResults";

describe('testing RollResults constructor', () => {

    test('should parse simplest table', () => {
        const rollResults = new RollResults([["1", "a"], ["2", "b"], ["3", "c"]], null)
        expect(rollResults.minRoll).toBe(1)
        expect(rollResults.maxRoll).toBe(3)
        expect(rollResults.ranges).toMatchObject([{from: 1, to: 1}, {from: 2, to: 2}, {from: 3, to: 3}])
    })

    test('should parse simple table with transformer', () => {
        const rollResults = new RollResults([["ONE", "a"], ["2-3", "b"], ["4-5", "c"]], s => s == "ONE" ? "1" : s)
        expect(rollResults.minRoll).toBe(1)
        expect(rollResults.maxRoll).toBe(5)
        expect(rollResults.ranges).toMatchObject([{from: 1, to: 1}, {from: 2, to: 3}, {from: 4, to: 5}])
    })

    test('should parse simple table with non-ascending range order', () => {
        const rollResults = new RollResults([["3-4", "a"], ["1-2", "b"], ["5-6", "c"]], null)
        expect(rollResults.minRoll).toBe(1)
        expect(rollResults.maxRoll).toBe(6)
        expect(rollResults.ranges).toMatchObject([{from: 3, to: 4}, {from: 1, to: 2}, {from: 5, to: 6}])
    })

    test('should not parse table with intersecting ranges', () => {
        expect(() => new RollResults([["1-3", "a"], ["2-4", "b"], ["5", "c"]], null)).toThrow(Error)
    })

    test('should not parse table with invalid range', () => {
        expect(() => new RollResults([["1-3", "a"], ["2-", "b"], ["5", "c"]], null)).toThrow(Error)
    })

    test('should not parse table with empty row', () => {
        expect(() => new RollResults([["1-3", "a"], [], ["5", "c"]], null)).toThrow(Error)
    })

    test('should not parse table with incomplete roll ranges', () => {
        expect(() => new RollResults([["5", "a"], ["2-3", "b"], ["1", "c"]], null)).toThrow(Error)
    })
})
