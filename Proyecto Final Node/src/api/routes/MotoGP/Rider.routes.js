const { upload } = require("../../../middleware/files.middleware");
const { create, getById, getAll, getByName, update, deleteRider, sortRidersByAscending, sortRidersByDescending, filterRiders } = require("../../controllers/MotoGP/Rider.controller");

const RiderRoutes = require("express").Router();

RiderRoutes.post("/", upload.single("image"), create);
RiderRoutes.get("/:id", getById);
RiderRoutes.get("/", getAll);
RiderRoutes.get("/byName/:name", getByName);
RiderRoutes.patch("/:id", upload.single("image"), update);
RiderRoutes.delete("/:id", deleteRider);
RiderRoutes.get("/sortascending/riders/:stat", sortRidersByAscending);
RiderRoutes.get("/sortdescending/riders/:stat", sortRidersByDescending);
RiderRoutes.get("/filter/riders/:filter/:gt/:lt", filterRiders);

module.exports = RiderRoutes;