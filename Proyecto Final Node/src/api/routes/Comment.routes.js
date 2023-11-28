const { isAuth } = require("../../middleware/auth.middleware");
const {
  create,
  getById,
  getAll,
  deleteComment,
  createPodiumComment,
} = require("../controllers/Comment.controller");

const CommentRoutes = require("express").Router();

CommentRoutes.post("/create/:location", [isAuth], create);
CommentRoutes.post("/createpodium/:locationMoto", createPodiumComment);
CommentRoutes.get("/getbyid/:id", getById);
CommentRoutes.get("/getall/:location", getAll);
CommentRoutes.delete("/delete/:id", deleteComment);

module.exports = CommentRoutes;
