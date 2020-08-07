const { Router } = require("express");
const router = Router();
const controller = require("../controllers")
const restrict = require("../helpers");

router.get("/", (req, res) => res.send('root'));

// users 
router.post("/signup", (req, res) => controller.signUp(req, res));
router.post("/signin", (req, res) => controller.signIn(req, res));
router.get("/verifyuser", (req, res) => controller.verifyUser(req, res));
router.get("/userprofile", (req, res) => controller.userProfile(req, res));

// messages 
router.post("/sendmessage", (req, res) => controller.sendMessage(req, res));

module.exports = router;
