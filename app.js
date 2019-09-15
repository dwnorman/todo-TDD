 const express = require ("express");
 const todoRoutes = require("./routes/todo.routes"); 
 const bodyParser = require('body-parser');
 const app = express();
 const mongodb = require("./mongodb/mongodb.connect");

 mongodb.connect();
// support parsing of application/json type post data


 app.use(express.json());

 app.use("/todos", todoRoutes);

 app.get("/", (req, res)=> {
     res.json("Hello world");
 });




//  app.listen(3000, () => {
//     console.log("Server is running");
// });

 module.exports = app;
