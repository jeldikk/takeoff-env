import {isDirectory} from "../src/lib/fs-helps"
import * as path from 'path'

describe("Testing fs-helper functions", ()=>{

    test("invalid directory testing", async ()=>{
        const isDir = await isDirectory(path.resolve(__dirname, './fs-helps.test.ts'));
        expect(isDir).toBe(false);
    })

    test("valid directory testing", async ()=>{
        const isDir = await isDirectory(__dirname);
        expect(isDir).toBe(true);
    })
})