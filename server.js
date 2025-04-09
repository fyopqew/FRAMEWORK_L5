const Framework = require("./src/framework/Application");
const Router = require("./src/framework/Router");
const fs = require("fs");
const path = require("path");
const performancesRoutes = require("./src/routes/v1/performancesRoutes");
const actorsRoutes = require("./src/routes/v1/actorsRoutes");

const app = new Framework();
const port = 5173;

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use((req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.addRouter(performancesRoutes);
app.addRouter(actorsRoutes);

app.listen(port, () => console.log(`Театральный сервер запущен на порту ${port}`));
