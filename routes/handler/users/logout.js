const { User, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const checkRefreshToken = await RefreshToken.findOne({
    where: { user_id: userId },
  });

  if (!checkRefreshToken) {
    return res.status(400).json({
      status: "error",
      message: "token not found",
    });
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  await RefreshToken.destroy({
    where: { user_id: userId },
  });

  return res.json({
    status: "success",
    message: "refresh token deleted",
  });
};
