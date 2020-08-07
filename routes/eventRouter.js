const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventController");
const restrict = require("../helpers");

router.get("/publicEvents", (req, res) => {
  eventController.getPublicEvents(req, res);
});
