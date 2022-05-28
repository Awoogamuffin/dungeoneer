import { generateQuery } from "./DmDgraphQueryGenerator";
import { queryGeneratorTests } from "./queryGeneratorTestData";

describe('Testing various aspects of the query generator', () => {
    for (const testData of queryGeneratorTests) {
        it(testData.name, () => {
        
            if (testData.shouldError) {
                expect(() => { generateQuery(testData.fetchParams, testData.schema) }).toThrow(testData.shouldError);
                return;
            }

            const query = generateQuery(testData.fetchParams, testData.schema).replace(/\s\s+|\n/g, ' ').trim();
            const expected = testData.expected.replace(/\s\s+|\n/g, ' ').trim();
            expect(query).toEqual(expected);
        })
    }
});