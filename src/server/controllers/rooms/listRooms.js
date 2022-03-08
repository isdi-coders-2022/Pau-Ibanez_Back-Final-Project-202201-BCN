const Room = require("../../../database/models/Room");

const listRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({
      isActive: true,
    }).populate("game");

    const roomsToSend = {
      rooms: [],
    };

    if (!rooms) {
      res.json(roomsToSend);
      return;
    }

    roomsToSend.rooms = rooms;
    res.json(roomsToSend);
  } catch (e) {
    next(e);
  }
};

module.exports = listRooms;