const express = require("express");
const { signin } = require("./controllers/user-controller");

const router = express.Router();

router.post("/signin", signin);

module.exports = router;
