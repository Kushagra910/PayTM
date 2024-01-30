const express = require("express");
const  {authMiddleware}  = require("../middlewares/auth");
const { getBalance ,transaction} = require("../controllers/Account");
const router = express.Router();


router.get("/balance",authMiddleware,getBalance);
router.post("/transfer",authMiddleware,transaction);


module.exports = router;