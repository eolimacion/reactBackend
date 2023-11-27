
const { isAuth, isOwner } = require("../../../middleware/auth.middleware");


const { deletePodium, create,getById,
    getAll,
    getByName,
    update, } = require("../../controllers/MotoGP/Podium.controller");


const PodiumRoutes = require("express").Router();

PodiumRoutes.post("/create", [isAuth], create);
PodiumRoutes.get("/:id", getById);
PodiumRoutes.get("/", getAll);
PodiumRoutes.get("/byname/:name", getByName);
PodiumRoutes.patch("/:id", [isOwner], update);
PodiumRoutes.delete("/delete/:id", [isOwner], deletePodium);

module.exports = PodiumRoutes;
