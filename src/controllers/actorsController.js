const actorsService = require("../services/actorsService");

module.exports = {
  getAll(req, res) {
    try {
      const data = actorsService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to get actors" });
    }
  },

  getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const actor = actorsService.getById(id);
      if (actor) {
        res.json(actor);
      } else {
        res.status(404).json({ error: "Actor not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to get actor" });
    }
  },

  create(req, res) {
    try {
      const newActor = actorsService.create(req.body);
      res.status(201).json({ message: "Actor created", data: newActor });
    } catch (err) {
      res.status(500).json({ error: "Failed to create actor" });
    }
  },

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updated = actorsService.update(id, req.body);
      if (updated) {
        res.json({ message: "Actor updated", data: updated });
      } else {
        res.status(404).json({ error: "Actor not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to update actor" });
    }
  },

  patch(req, res) {
    try {
      const id = parseInt(req.params.id);
      const patched = actorsService.patch(id, req.body);
      if (patched) {
        res.json({ message: "Actor patched", data: patched });
      } else {
        res.status(404).json({ error: "Actor not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to patch actor" });
    }
  },

  remove(req, res) {
    try {
      const id = parseInt(req.params.id);
      const removed = actorsService.remove(id);
      if (removed) {
        res.json({ message: "Actor removed", data: removed });
      } else {
        res.status(404).json({ error: "Actor not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to delete actor" });
    }
  }
};
