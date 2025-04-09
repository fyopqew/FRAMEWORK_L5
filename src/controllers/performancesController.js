const performancesService = require("../services/performancesService");

module.exports = {
  getAll(req, res) {
    try {
      const data = performancesService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to get performances" });
    }
  },

  getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const performance = performancesService.getById(id);
      if (performance) {
        res.json(performance);
      } else {
        res.status(404).json({ error: "Performance not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to get performance" });
    }
  },

  create(req, res) {
    try {
      console.log("CREATE body:", req.body);
      const newPerformance = performancesService.create(req.body);
      res.status(201).json({ message: "Performance created", data: newPerformance });
    } catch (err) {
      console.error("Error in create:", err);
      res.status(500).json({ error: "Failed to create performance" });
    }
  },

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updated = performancesService.update(id, req.body);
      if (updated) {
        res.json({ message: "Performance updated", data: updated });
      } else {
        res.status(404).json({ error: "Performance not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to update performance" });
    }
  },

  patch(req, res) {
    try {
      const id = parseInt(req.params.id);
      const patched = performancesService.patch(id, req.body);
      if (patched) {
        res.json({ message: "Performance patched", data: patched });
      } else {
        res.status(404).json({ error: "Performance not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to patch performance" });
    }
  },

  remove(req, res) {
    try {
      const id = parseInt(req.params.id);
      const removed = performancesService.remove(id);
      if (removed) {
        res.json({ message: "Performance removed", data: removed });
      } else {
        res.status(404).json({ error: "Performance not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to delete performance" });
    }
  }
};