const express = require("express");
const { signup, login, getMe, logout, changePassword } = require("../controllers/Auth");
const { auth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", auth, isAdmin, signup);
router.post("/login", login);
router.get("/me", auth, getMe);
router.post("/logout", logout);
router.put("/change-password", auth, changePassword);

module.exports = router;
