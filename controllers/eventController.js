const Event = require("../models/event");

const getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find();
    let publicEvents = events.filter((event) => event.isPublic == true);
    return res.json(publicEvents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPublicEvents,
};
