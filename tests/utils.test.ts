import path from 'path'
import {isNodeEnvironmentPresent, isNodeProject} from "../src/lib/utils"

describe("testing utilities functions", ()=>{
    
    test("invalid node environment path", async ()=>{
        const present = await isNodeEnvironmentPresent(__dirname);
        expect(present).toBe(false);
    }, 2000)

    test('valid node environment path', async ()=>{
        const present = await isNodeEnvironmentPresent(path.resolve(__dirname, "../"));
        expect(present).toBe(true);
    }, 2000)

    test("invalid node project path", async ()=>{
        const present = await isNodeProject(__dirname);
        expect(present).toBe(false);
    },2000)

    test("valid node project path", async ()=>{
        const present = await isNodeProject(path.resolve(__dirname, "../"));
        expect(present).toBe(true);
    }, 2000)
})