const supertest = require( 'supertest' );
const app = require( '../../src/app' );
const connection = require( '../../src/database/connection' );

describe( 'ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy(); // Desfaz a conexão com o banco de dados após os testes.
    });

    it('should be able to create a new ONG', async () => {
        const response = await supertest( app )
        .post( '/ongs' )
        .send({
            name: "Teste",
            email: "teste@teste.com.br",
            whatsapp: "83986669824",
            city: "Campina Grande",
            uf: "PB"
        });

        expect( response.body ).toHaveProperty( 'id' );
        expect( response.body.id ).toHaveLength( 8 );
    });
});
