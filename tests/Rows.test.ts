import {describe, expect, test} from "@jest/globals";
import {Rows} from "../src/randomtable/Rows";

describe('testing Rows', () => {

    test('should parse simplest table', () => {
        const rows = new Rows(["1|a", "2|b", "3|c"]);
        expect(rows.columnsCount).toBe(2)
        expect(rows.rows).toStrictEqual([["1", "a"], ["2", "b"], ["3", "c"]])
        expect(rows.rollsForRows).toStrictEqual([[1], [2], [3]])
        expect(rows.minRoll).toBe(1)
        expect(rows.maxRoll).toBe(3)
    })


    test('should parse table with ranges and variable amount of columns', () => {
        const rows = new Rows(["1-2|a|q", "3-5|b", "6|c|w|e"]);
        expect(rows.columnsCount).toBe(4)
        expect(rows.rows).toStrictEqual([["1-2", "a", "q", ""], ["3-5", "b", "", ""], ["6", "c", "w", "e"]])
        expect(rows.rollsForRows).toStrictEqual([[1, 2], [3, 4, 5], [6]])
        expect(rows.minRoll).toBe(1)
        expect(rows.maxRoll).toBe(6)
    })

    test("should fail if table misses a roll value", () => {
        expect(() => new Rows(["1-2|a", "4-5|b", "6|c"])).toThrow(RangeError)
    })

    test("should fail if table contains overlapping roll expressions", () => {
        expect(() => new Rows(["1-3|a", "2|b", "4|c"])).toThrow(RangeError)
    })

    test('should parse table without ranges', () => {
        const rows = new Rows(["a", "b", "c"]);
        expect(rows.columnsCount).toBe(1)
        expect(rows.rows).toStrictEqual([["a"], ["b"], ["c"]])
        expect(rows.rollsForRows).toStrictEqual([[1], [2], [3]])
        expect(rows.minRoll).toBe(1)
        expect(rows.maxRoll).toBe(3)
    })

    test('should parse feat die expressions', () => {
        const rows = new Rows(["G|a", "1-10|b", "E|c"]);
        expect(rows.columnsCount).toBe(2)
        expect(rows.rows).toStrictEqual([["G", "a"], ["1-10", "b"], ["E", "c"]])
        expect(rows.rollsForRows).toStrictEqual([[12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [11]])
        expect(rows.minRoll).toBe(1)
        expect(rows.maxRoll).toBe(12)
    })
})
