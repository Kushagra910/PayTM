const express = require("express");
const router = express.Router();
const {signIn,signUp} = require("../controllers/Auth");
const {authMiddleware} = require("../middlewares/auth");
const {updateProfile,getMatchingUsers} = require("../controllers/Profile");


router.post("/signup",signUp);
router.post("/login",signIn);
router.put("/updateProfile",authMiddleware,updateProfile);
router.get("/bulk",getMatchingUsers);

module.exports = router;