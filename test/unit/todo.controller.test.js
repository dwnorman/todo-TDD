const httpMocks = require( 'node-mocks-http' );
const TodoController = require( '../../controllers/todo.controller' );
const TodoModel = require( '../../model/todo.model' );
const newTodo = require( '../mock-data/new-todo.json' );
const allTodos = require( '../mock-data/all-todos.json' );

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

let req; let res; let next;
const todoId = '5d81958eafa35e49913038b4';
beforeEach( () => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
} );

describe( 'TodoController.updateTodo', () => {
  it( 'should have an updateTodo function', () => {
    expect( typeof TodoController.updateTodo ).toBe( 'function' );
  } );
  it( 'Should update with TodoModel.findByIdAndUPdate', async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.updateTodo( req, res, next );
    expect( TodoModel.findByIdAndUpdate ).toHaveBeenCalledWith( todoId, newTodo, {
      new: true,
      useFindAndModify: false
    } );
  } );
  it( 'should return a response with the json data and http code 200', async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue( newTodo );
    await TodoController.updateTodo( req, res, next );
    expect( res._isEndCalled() ).toBeTruthy();
    expect( res.statusCode ).toBe( 200 );
    expect( res._getJSONData() ).toStrictEqual( newTodo );
  } );
  it( 'should handel http error', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject( errorMessage );
    TodoModel.findByIdAndUpdate.mockReturnValue( rejectedPromise );
    await TodoController.updateTodo( req, res, next );
    expect( next ).toHaveBeenCalledWith( errorMessage );
  } );
  it( 'should return 404 when item not updateTodo', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue( null );
    await TodoController.updateTodo( req, res, next );
    expect( res.statusCode ).toBe( 404 );
    expect( res._isEndCalled() ).toBeTruthy();
  } );
} );

describe( 'TodoController.getTodoById', () => {
  it( 'should have a getTodoById', async () => {
    await expect( typeof TodoController.getTodoById ).toBe( 'function' );
  } );
  it( 'should call TodoModel.findById with route parameters', async () => {
    req.params.todoId = todoId;
    await TodoController.getTodoById( req, res, next );
    expect( TodoModel.findById ).toBeCalledWith( todoId );
  } );
  it( 'should return response with status 200 and newTodo', async () => {
    TodoModel.findById.mockReturnValue( newTodo );
    await TodoController.getTodoById( req, res, next );
    expect( res.statusCode ).toBe( 200 );
    expect( res._isEndCalled() ).toBeTruthy();
    expect( res._getJSONData() ).toStrictEqual( newTodo );
  } );
  it( 'should handle errors in getTodoById', async () => {
    const errorMessage = { message: 'Encounted trouble' };
    const rejectedPromise = Promise.reject( errorMessage );
    TodoModel.findById.mockReturnValue( rejectedPromise );
    await TodoController.getTodoById( req, res, next );
    expect( next ).toHaveBeenCalledWith( errorMessage );
  } );
  it( 'should return 404 when item not newTodo', async () => {
    TodoModel.findById.mockReturnValue( null );
    await TodoController.getTodoById( req, res, next );
    expect( res.statusCode ).toBe( 404 );
    expect( res._isEndCalled() ).toBeTruthy();
  } );
} );

describe( 'TodoController.getTodos', () => {
  it( 'should have a getTodos function', () => {
    expect( typeof TodoController.getTodos ).toBe( 'function' );
  } );
  it( 'should call TodoModel.find({})', async () => {
    await TodoController.getTodos( req, res, next );
    expect( TodoModel.find ).toHaveBeenCalledWith( {} );
  } );
  it( 'should return response with status 200 and all todos', async () => {
    TodoModel.find.mockReturnValue( allTodos );
    await TodoController.getTodos( req, res, next );
    expect( res.statusCode ).toBe( 200 );
    expect( res._isEndCalled() ).toBeTruthy();
    expect( res._getJSONData() ).toStrictEqual( allTodos );
  } );
  it( 'should handle errors in getTodos', async () => {
    const errorMessage = { message: 'Something happened with todo list' };
    const rejectedPromise = Promise.reject( errorMessage );
    TodoModel.find.mockReturnValue( rejectedPromise );
    await TodoController.createTodo( req, res, next );
    expect( next );
  } );
} );

describe( 'TodoController.createTodo', () => {
  beforeEach( () => {
    req.body = newTodo;
  } );

  it( 'should have a createTodo function', () => {
    expect( typeof TodoController.createTodo ).toBe( 'function' );
  } );
  it( 'should call TodoModel.create', () => {
    TodoController.createTodo( req, res, next );
    expect( TodoModel.create ).toBeCalledWith( newTodo );
  } );
  it( 'should return 201 response code', async () => {
    await TodoController.createTodo( req, res, next );
    expect( res.statusCode ).toBe( 201 );
    expect( res._isEndCalled() ).toBeTruthy();
  } );
  it( 'should return json body in response', async () => {
    TodoModel.create.mockReturnValue( newTodo );
    await TodoController.createTodo( req, res, next );
    expect( res._getJSONData() ).toStrictEqual( newTodo );
  } );
  it( 'should handle errors', async () => {
    const errorMessage = { message: 'Done property missing' };
    const rejectedPromise = Promise.reject( errorMessage );
    TodoModel.create.mockReturnValue( rejectedPromise );
    await TodoController.createTodo( req, res, next );
    expect( next ).toBeCalledWith( errorMessage );
  } );
} );
