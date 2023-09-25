const express = require("express");
const router = express.Router();
const loanController = require("../controller/loan");

router.post("/", loanController.applyForLoan);

module.exports = router;