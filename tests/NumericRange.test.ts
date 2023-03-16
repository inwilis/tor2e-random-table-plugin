import {describe, expect, test} from "@jest/globals";
import {NumericRange} from "../src/randomtable/NumericRange";

describe("testing NumericRange constructor", () => {

    test("should parse numbers", () => {
        expect(new NumericRange("1")).toMatchObject({from: 1, to: 1})
        expect(new NumericRange("4")).toMatchObject({from: 4, to: 4})
        expect(new NumericRange("17")).toMatchObject({from: 17, to: 17})
        expect(new NumericRange("101")).toMatchObject({from: 101, to: 101})
    })


    test("should parse ranges", () => {
        expect(new NumericRange("1-3")).toMatchObject({from: 1, to: 3})
        expect(new NumericRange("17-19")).toMatchObject({from: 17, to: 19})
        expect(new NumericRange("101-106")).toMatchObject({from: 101, to: 106})
        expect(new NumericRange("1-1")).toMatchObject({from: 1, to: 1})
        expect(new NumericRange(" 1 - 3 ")).toMatchObject({from: 1, to: 3})
    })


    test("should not parse incorrect ranges", () => {
        // expect(() =>new NumericRange("19-17")).toThrow(Error)
        // expect(() =>new NumericRange("101-")).toThrow(Error)
        // expect(() =>new NumericRange("-17")).toThrow(Error)
        expect(() => new NumericRange("19-17-")).toThrow(Error)
    })

    test("should not parse non-numbers", () => {
        expect(() => new NumericRange("")).toThrow(Error)
        expect(() => new NumericRange("-1")).toThrow(Error)
        expect(() => new NumericRange("a")).toThrow(Error)
        expect(() => new NumericRange("1-a")).toThrow(Error)
    })
})

describe("testing NumericRange.includes()", () => {

    test("should include numbers inside range", () => {
        expect(new NumericRange("3-5").includes(3)).toBeTruthy()
        expect(new NumericRange("3-5").includes(4)).toBeTruthy()
        expect(new NumericRange("3-5").includes(5)).toBeTruthy()
        expect(new NumericRange("7-7").includes(7)).toBeTruthy()
    })

    test("should not include numbers outside range", () => {
        expect(new NumericRange("3-5").includes(2)).toBeFalsy()
        expect(new NumericRange("3-5").includes(6)).toBeFalsy()
        expect(new NumericRange("3-5").includes(0)).toBeFalsy()
        expect(new NumericRange("3-5").includes(-1)).toBeFalsy()
        expect(new NumericRange("7-7").includes(6)).toBeFalsy()
        expect(new NumericRange("7-7").includes(8)).toBeFalsy()
    })
})

describe("testing NumericRange.intersects()", () => {

    test("should correctly check for intersection", () => {
        expect(new NumericRange("4-10").intersects(new NumericRange("4-5"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("4-4"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("10-11"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("10-10"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("5-6"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("2-15"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("1-6"))).toBeTruthy()
        expect(new NumericRange("4-10").intersects(new NumericRange("7-15"))).toBeTruthy()
        expect(new NumericRange("4-4").intersects(new NumericRange("4-4"))).toBeTruthy()
        expect(new NumericRange("4-4").intersects(new NumericRange("3-9"))).toBeTruthy()
    })

    test("should correctly check for non-intersection", () => {
        expect(new NumericRange("4-10").intersects(new NumericRange("1-3"))).toBeFalsy()
        expect(new NumericRange("4-10").intersects(new NumericRange("11-15"))).toBeFalsy()
        expect(new NumericRange("4-10").intersects(new NumericRange("3-3"))).toBeFalsy()
        expect(new NumericRange("4-10").intersects(new NumericRange("11-11"))).toBeFalsy()
        expect(new NumericRange("4-10").intersects(new NumericRange("1-2"))).toBeFalsy()
        expect(new NumericRange("4-10").intersects(new NumericRange("13-15"))).toBeFalsy()
    })
})

describe("testing NumericRange.toString()", () => {

    test("should convert short ranges", () => {
        expect(new NumericRange("1").toString()).toBe("1")
        expect(new NumericRange("3-3").toString()).toBe("3")
    })

    test("should convert long ranges", () => {
        expect(new NumericRange("1-10").toString()).toBe("1-10")
    })

})
