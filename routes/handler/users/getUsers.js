const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userIds = req.query.user_id || [];
    const sqlOptions = {
      attributes: ["id", "name", "email", "role", "profession", "avatar"],
    };

    if (userIds.length) {
      sqlOptions.where = {
        id: userIds,
      };
    }

    const user = await User.findAll(sqlOptions);

    return res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
