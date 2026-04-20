const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors()); // middleware
app.use(express.json()); // 

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// assume it as database
let todos = [
  { id: 1, title: "react" },
  { id: 2, title: "css" },
  { id: 3, title: "html" },
//{ id: 4, title: "mongdob"},
];

app.get("/api/todos", (req, res) => {
  res.send(todos);
});

app.post("/api/todos", (req, res) => {
  console.log(req.body);
  res.send("todos created");
});

app.put("/api/todos/:slug", (req, res) => {
  res.send("todos updated");
});

app.delete("/api/todos/:slug", (req, res) => {
  res.send("todos delete");
});

app.get("/api/products/", (req, res) => {
  res.send([
    { id: 1, title: "mouse" },
    { id: 2, title: "keyboard" },
    { id: 3, title: "keyboard" },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});