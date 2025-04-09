const path = require("path");
const fs = require("fs");
const dbPath = path.join(__dirname, "../db/performances.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getAll() {
    return readDB();
  },

  getById(id) {
    return readDB().find((item) => item.id === id);
  },

  create(data) {
    const db = readDB();
    const newItem = {
      id: db.length ? db[db.length - 1].id + 1 : 1,
      ...data
    };
    db.push(newItem);
    writeDB(db);
    return newItem;
  },

  update(id, data) {
    const db = readDB();
    const index = db.findIndex((item) => item.id === id);
    if (index === -1) return null;
    db[index] = { id, ...data };
    writeDB(db);
    return db[index];
  },

  patch(id, data) {
    const db = readDB();
    const index = db.findIndex((item) => item.id === id);
    if (index === -1) return null;
    db[index] = { ...db[index], ...data };
    writeDB(db);
    return db[index];
  },

  remove(id) {
    const db = readDB();
    const index = db.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const removed = db.splice(index, 1);
    writeDB(db);
    return removed[0];
  }
};
