const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    it("POST " + endpointUrl, () => {
            const response = request (app)
                .post(endpointUrl)
                .send(newTodo);
                console.log(response.statusCode);
                expect(response.statusCode).toBe(201),
                expect(response.body.title).toBe(newTodo.title),
                expect(response.body.done).toBe(newTodo.done)
        });
});