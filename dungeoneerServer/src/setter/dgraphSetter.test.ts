import { setterTests } from "./dgraphSetterTestData";
import { getSetArrays } from "./DmDgraphSetter";

describe('Testing setter', () => {
    for (const testData of setterTests) {
        it(testData.name, async () => {
        
            /* if (testData.shouldError) {
                expect(() => { generateQuery(testData.fetchParams, testData.schema) }).toThrow(testData.shouldError);
                return;
            } */

            const mutations = await getSetArrays(testData.setParams, testData.schema)
            const result = JSON.stringify(mutations).replace(/\s\s+|\n/g, ' ').trim();
            const expected = testData.expected.replace(/\s\s+|\n/g, ' ').trim();
            expect(result).toEqual(expected);
        })
    }
});