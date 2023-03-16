import {describe, expect, test} from "@jest/globals";
import {Rows} from "../src/randomtable/Rows";

describe('testing Rows constructor', () => {

    test('should parse simplest table', () => {
        const rows = new Rows(["1|a", "2|b", "3|c"]);
        expect(rows.columnsCount).toBe(2)
        expect(rows.rows).toStrictEqual([["1", "a"], ["2", "b"], ["3", "c"]])
    })


    test('should parse table with variable amount of columns', () => {
        const rows = new Rows(["1-2|a|q", "3-5|b", "6|c|w|e"]);
        expect(rows.columnsCount).toBe(4)
        expect(rows.rows).toStrictEqual([["1-2", "a", "q", ""], ["3-5", "b", "", ""], ["6", "c", "w", "e"]])
    })


    test('should parse table with single column', () => {
        const rows = new Rows(["a", "b", "c"]);
        expect(rows.columnsCount).toBe(1)
        expect(rows.rows).toStrictEqual([["a"], ["b"], ["c"]])
    })

    test("should fail if table misses a row", () => {
        expect(() => new Rows(["1-2|a", "", "6|c"])).toThrow(Error)
    })
    test("should fail if table contains empty row", () => {
        expect(() => new Rows(["1-3|a", "|", "4|c"])).toThrow(Error)
    })

})
