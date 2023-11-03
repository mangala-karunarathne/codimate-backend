const express = require("express");
const router = express();
const {registerEmployer, loginEmployer, palingdrome, differenceCheck, } =  require("../controllers/employerController.js")


router.post("/palingdrome-check", palingdrome); // api/users/palingdrome-check
router.post("/difference-check", differenceCheck); // api/users/difference-check
router.post("/register", registerEmployer); // api/users/register
router.post("/login", loginEmployer); // api/users/login

module.exports = router;