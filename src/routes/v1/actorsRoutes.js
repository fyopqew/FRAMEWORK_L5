const Router = require("../../framework/Router");
const actorsController = require("../../controllers/actorsController");

const router = new Router();

router.get("/api/v1/actors", actorsController.getAll);
router.get("/api/v1/actors/:id", actorsController.getById);
router.post("/api/v1/actors", actorsController.create);
router.put("/api/v1/actors/:id", actorsController.update);
router.patch("/api/v1/actors/:id", actorsController.patch);
router.delete("/api/v1/actors/:id", actorsController.remove);

module.exports = router;