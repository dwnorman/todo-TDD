const request = require( 'supertest' );
const app = require( '../../app' );
const newTodo = require( '../mock-data/new-todo.json' );

const endpointUrl = '/todos/';

let firstTodo, newTodoId;
const nonExistingTodoId = '5d5fff416bef3c07ecf11f77';

describe( endpointUrl, () => {
  test( 'GET ' + endpointUrl, done => {
    async () => {
      const response = await request( app ).get( endpointUrl );
      expect( response.statusCode ).toBe( 200 );
      expect( Array.isArray( response.body ) ).toBeTruthy();
      expect( response.body[0].title ).toBeDefined();
      expect( response.body[0].done ).toBeDefined();
      firstTodo = response.body[0];
    };
    done();
  } );
  test( 'GET by Id ' + endpointUrl + ':todoId', done => {
    async () => {
      const response = await request( app ).get( endpointUrl + firstTodo._id );
      expect( response.statusCode ).toBe( 200 );
      expect( response.body.title ).toBe( firstTodo.title );
      expect( response.body.done ).toBe( firstTodo.done );
    };
    done();
  } );
  test( "GET todoby id doesn't exist" + endpointUrl + ':todoId', done => {
    async () => {
      const response = await request( app ).get( endpointUrl + nonExistingTodoId );
      expect( response.statusCode ).toBe( 404 );
    };
    done();
  } );
  it( 'POST ' + endpointUrl, done => {
    async () => {
      const response = await request( app )
        .post( endpointUrl )
        .send( newTodo );
      expect( response.statusCode ).toBe( 201 );
      expect( response.body.title ).toBe( newTodo.title );
      expect( response.body.done ).toBe( newTodo.done );
      newTodoId = response.body._id;
    };
    done();
  } );

  it( 'should return error 500 on malformed data with POST' + endpointUrl, done => {
    async () => {
      const response = await request( app )
        .post( endpointUrl )
        .send( { title: 'Missing done property' } );
      expect( response.statusCode ).toBe( 500 );
      expect( response.body ).toStrictEqual( {
        message: 'Todo validation failed: done: Path `done` is required.'
      } );
    };
    done();
  } );
  it( 'PUT ' + endpointUrl, done => {
    async () => {
      const testData = { title: 'Make integration test for PUT', done: true };
      const res = await request( app )
        .put( endpointUrl + newTodoId )
        .send( testData );
      expect( res.statusCode ).toBe( 200 );
      expect( res.body.title ).toBe( testData.title );
      expect( res.body.done ).toBe( testData.done );
    };
    done();
  } );
  it( 'should return 404 on PUT ' + endpointUrl, done => {
    async () => {
      const testData = { title: 'Make integration test for PUT', done: true };
      const res = await request( app )
        .put( endpointUrl + nonExistingTodoId )
        .send( testData );
      expect( res.statusCode ).toBe( 404 );
    };
    done();
  } );
} );
