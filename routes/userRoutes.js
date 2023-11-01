const express = require("express");
const router = express();
const {registerUser, loginUser} =  require("../controllers/userController.js")


router.post("/register", registerUser); // api/users/register
router.post("/login", loginUser); // api/users/login

module.exports = router;