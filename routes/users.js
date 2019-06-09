const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/login",userController.getUserLogin);
router.get("/logout",userController.getUserLogout);
router.get("/register",userController.getUserRegister);
router.post("/login",userController.postUserLogin);
router.post("/register",userController.postUserRegister);
router.get("/newComment",userController.getNewComment);
router.post("/newComment",userController.postNewComment);
router.get("/newMovie",userController.getNewMovie);
router.post("/newMovie",userController.postNewMovie);

module.exports = router;