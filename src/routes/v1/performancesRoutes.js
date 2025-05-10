const Router = require("../../framework/Router");
const performancesController = require("../../controllers/performancesController");

const router = new Router();

router.get("/api/v1/performances", performancesController.getAll);
router.get("/api/v1/performances/:id", performancesController.getById);
router.post("/api/v1/performances", performancesController.create);
router.put("/api/v1/performances/:id", performancesController.update);
router.patch("/api/v1/performances/:id", performancesController.patch);
router.delete("/api/v1/performances/:id", performancesController.remove);

module.exports = router;