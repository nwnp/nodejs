const logger = require("../lib/logger.js");
const userService = require("../service/userService.js");

const signup = async (req, res, next) => {
  try {
    const params = {
      departmentId: req.body.departmentId,
      name: req.body.name,
      userId: req.body.userId,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    if (!params.name || !params.userId || !params.password) {
      const err = new Error("Not allowed null (name, userId, password)");
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    console.log("here");
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ err: error.toString() });
  }
};

const list = async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
      userId: req.body.userId,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);
    const result = await userService.list(params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  signup,
  list,
};
