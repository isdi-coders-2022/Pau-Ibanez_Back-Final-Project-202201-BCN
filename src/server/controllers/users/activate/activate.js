const jwt = require("jsonwebtoken");
const User = require("../../../../database/models/User");

const secret = process.env.TOKEN_SECRET;

const activate = async (req, res, next) => {
  const { activationToken } = req.params;

  try {
    const { id: userId } = jwt.verify(activationToken, secret);

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      const error = {
        code: 404,
        send: "User not found",
      };
      next(error);
      return;
    }

    if (foundUser.active === true) {
      const error = {
        code: 400,
        send: "This user is already activated",
      };
      next(error);
      return;
    }

    await User.findByIdAndUpdate(userId, {
      active: true,
      $unset: { activationToken },
    });

    res.json({});
  } catch (e) {
    const error = {
      code: 400,
      send: "Invalid activation token",
    };
    next(error);
  }
};

module.exports = activate;
