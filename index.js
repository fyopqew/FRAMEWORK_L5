const Framework = require("./framework/Application.js");
const Router = require("./framework/Router.js");
const users = require("./usersDB");

const app = new Framework();
const port = 5173;

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

const userRouter = new Router();

userRouter.get("/users", (req, res) => {
  res.json(users);
});

userRouter.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: `User ${userId} not found` });
  }
});

userRouter.post("/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age
  };
  users.push(newUser);
  res.status(201).json({ message: "User created", data: newUser });
});

userRouter.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    users[index] = { id: userId, ...req.body };
    res.json({ message: `User ${userId} updated`, data: users[index] });
  } else {
    res.status(404).json({ error: `User ${userId} not found` });
  }
});

userRouter.patch("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (user) {
    Object.assign(user, req.body);
    res.json({ message: `User ${userId} partially updated`, data: user });
  } else {
    res.status(404).json({ error: `User ${userId} not found` });
  }
});

userRouter.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    const deleted = users.splice(index, 1);
    res.json({ message: `User ${userId} deleted`, data: deleted[0] });
  } else {
    res.status(404).json({ error: `User ${userId} not found` });
  }
});

app.addRouter(userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
