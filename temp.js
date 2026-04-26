const express = require("express");
const cors = require("cors");

const { Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres') 

async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

connectDB();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// // fake database
// let todos = [
//   { id: 1, title: "react", status: false },
//   { id: 2, title: "css", status: false },
//   { id: 3, title: "html", status: false },
//   { id: 4, title: "MySql", status: false },
//   { id: 5, title: "Postgres", status: false },
// ];


const Todo = sequelize.define(
  'todos',
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    timestamps:true, 
    tableName:"todos",
    underscored:true,
  },
);

// HOME
app.get("/",(req, res) => {
  res.send("Hello World!!");
});

// GET ALL TODOS
app.get("/api/todos",  async(req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});


// CREATE TODO
app.post("/api/todos", async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newtodo = await Todo.create({
      title,
    });

    res.status(201).json({
      message: "Todo created",
      data: newtodo,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE TODO (title + status)
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, status } = req.body;

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) {
    todos[index].title = title;
  }

  if (status !== undefined) {
    todos[index].status = status;
  }

  res.json({
    message: "Todo updated",
    data: todos[index],
  });
});

// DELETE TODO
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);

  res.json({
    message: "Todo deleted",
    data: deleted[0],
  });
});


// app.get("/api/products", (req, res) => {
//   res.json([
//     { id: 1, title: "mouse" },
//     { id: 2, title: "keyboard" },
//     { id: 3, title: "monitor" },
//   ]);
// });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});