const express = require( 'express' );
const cors = require( 'cors' );
const routes = require( './routes' );
const { errors } = require( 'celebrate' );

const app = express();

app.use( cors() ); // Sem o objeto dentro do CORS, faz com que qualquer endereço acesse a aplicação, quando em modo de desenvolvimento.
app.use( express.json() );
app.use( routes );
app.use( errors() );

module.exports = app;
