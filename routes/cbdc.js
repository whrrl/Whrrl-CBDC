const express = require("express");
const router = express.Router();
const cbdcController = require("../controller/cbdc");

router.post("/", cbdcController.mintCBDC);
router.post("/burn", cbdcController.burnCBDC);
router.post("/transfer", cbdcController.transferCBDC);

module.exports = router;