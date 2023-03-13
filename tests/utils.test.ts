import {describe, expect, test} from "@jest/globals";
import {ensureArraySize, ensureArraySizeInPlace, parseRollExpression} from "../src/randomtable/utils";

describe("testing ensureArraySize()", () => {

    test("should add missing elements", () => {
        expect(ensureArraySize(["1", "2"], 4)).toStrictEqual(["1", "2", "", ""])
    })

    test("should remove extra elements", () => {
        expect(ensureArraySize(["1", "2", "3", "4", "5"], 3)).toStrictEqual(["1", "2", "3"])
    })
})


describe("testing ensureArraySizeInPlace()", () => {

    test("should add missing elements", () => {
        const array = ["1", "2"];
        ensureArraySizeInPlace(array, 4)
        expect(array).toStrictEqual(["1", "2", "", ""])
    })

    test("should remove extra elements", () => {
        const array = ["1", "2", "3", "4", "5"];
        ensureArraySizeInPlace(array, 3)
        expect(array).toStrictEqual(["1", "2", "3"])
    })
})

describe("testing parseRollExpression()", () => {

    test("should parse numbers", () => {
        expect(parseRollExpression("1")).toStrictEqual([1])
        expect(parseRollExpression("4")).toStrictEqual([4])
        expect(parseRollExpression("17")).toStrictEqual([17])
        expect(parseRollExpression("101")).toStrictEqual([101])
    })

    test("should parse feat die expressions", () => {
        expect(parseRollExpression("G")).toStrictEqual([12])
        expect(parseRollExpression("E")).toStrictEqual([11])
    })

    test("should parse ranges", () => {
        expect(parseRollExpression("1-3")).toStrictEqual([1, 2, 3])
        expect(parseRollExpression("17-19")).toStrictEqual([17, 18, 19])
        expect(parseRollExpression("101-106")).toStrictEqual([101, 102, 103, 104, 105, 106])
    })

    test("should not parse incorrect ranges", () => {
        expect(parseRollExpression("1-1")).toStrictEqual([])
        expect(parseRollExpression("19-17")).toStrictEqual([])
        expect(parseRollExpression("101-")).toStrictEqual([])
        expect(parseRollExpression("-17")).toStrictEqual([])
        expect(parseRollExpression("19-17-")).toStrictEqual([])
    })

    test("should not parse non-numbers", () => {
        expect(parseRollExpression("")).toStrictEqual([])
        expect(parseRollExpression("-1")).toStrictEqual([])
        expect(parseRollExpression("a")).toStrictEqual([])
        expect(parseRollExpression("1-a")).toStrictEqual([])
    })
})
