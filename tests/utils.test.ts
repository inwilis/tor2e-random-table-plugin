import {describe, expect, test} from "@jest/globals";
import {ensureArraySize, ensureArraySizeInPlace} from "../src/randomtable/utils";

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


