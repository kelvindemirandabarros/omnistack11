const generate = require( '../../src/utils/generateUniqueId' );

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generate();

        expect( id ).toHaveLength(8);
    })
});
