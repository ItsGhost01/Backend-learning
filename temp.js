let todos = [
  { id: 1, title: "react", status: false },
  { id: 2, title: "css", status: true },
  { id: 3, title: "css", status: true },
];


// dleete id = 2

todos = todos.filter((todo) => todo.id !== 2);

console.log(todos);


// Update id 1  

todos = todos.map((todo) =>
  todo.id === 1
    ? { ...todo, title: "React JS", status: true }
    : todo
);

console.log(todos);