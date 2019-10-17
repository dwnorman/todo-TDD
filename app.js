const express = require( 'express' );
const todoRoutes = require( './routes/todo.routes' );
const mongodb = require( './mongodb/mongodb.connect' );

const app = express();

mongodb.connect();

app.use( express.json() );

app.use( '/todos', todoRoutes );

app.use( ( error, req, res, next ) => {
  res.status( 500 ).json( { message: error.message } );
} );

app.get( '/', ( req, res ) => {
  res.json( 'Hello world!' );
} );

module.exports = app;
