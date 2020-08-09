const { Router } = require("express");
const router = Router();
const controller = require("../controllers");
const restrict = require("../helpers");

router.get("/", (req, res) => res.send("root"));

// users
router.post("/signup", (req, res) => controller.signUp(req, res));
router.post("/signin", (req, res) => controller.signIn(req, res));
router.get("/verifyuser", (req, res) => controller.verifyUser(req, res));
router.get("/userprofile", (req, res) => controller.userProfile(req, res));
router.put("/attendEvent/:id", (req, res) => controller.attendEvent(req, res));
// events
router.get("/events", (req, res) => controller.getEvents(req, res));
router.get("/events/:id", (req, res) => controller.getEvent(req, res));
router.post("/events/", (req, res) => controller.createEvent(req, res));
router.put("/events/:id", (req, res) => controller.editEvent(req, res));
router.delete("/events/:id", (req, res) => controller.deleteEvent(req, res));
router.get("/searchevents/:term", (req, res) =>
  controller.searchEvents(req, res)
);

// messages
router.post("/messages", (req, res) => controller.sendMessage(req, res));
router.get("/messages", (req, res) => controller.getMessages(req, res));

<<<<<<< HEAD
// friends and friend requests 
router.post("/friendrequests", (req, res) => controller.createFriendRequest(req, res));
router.get("/friendrequests", (req, res) => controller.getFriendRequests(req, res));
router.post("/acceptfriendrequests/:id", (req, res) => controller.acceptFriendRequest(req, res));

=======
// friends and friend requests
router.post("/friendrequests", (req, res) =>
  controller.createFriendRequest(req, res)
);
router.get("/friendrequests", (req, res) =>
  controller.getFriendRequests(req, res)
);
router.post("/acceptfriendrequests/:id", (req, res) =>
  controller.acceptFriendRequest(req, res)
);
>>>>>>> aaeca4e4f71f3f316dabf234fc2f8d4fd2bb21f5

module.exports = router;
