module.exports = (app) => {
    app.put("/users/:id", (req, res) => {
      res.json({ message: `User ${req.params.id} updated`, data: req.body });
    });
  
    app.patch("/users/:id", (req, res) => {
      res.json({ message: `User ${req.params.id} partially updated`, data: req.body });
    });
  
    app.delete("/users/:id", (req, res) => {
      res.json({ message: `User ${req.params.id} deleted` });
    });
  };
  