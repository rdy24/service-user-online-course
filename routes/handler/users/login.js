const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      email: "email|empty:false",
      password: "string|min:6",
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const password = await bcrypt.compare(req.body.password, user.password);

    if (!password) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    return res.json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
