const logger = require("../lib/logger.js");
const tokenUtil = require("../lib/tokenUtil.js");
const userService = require("../service/userService.js");

const token = async (req, res, next) => {
  try {
    const params = {
      userId: req.body.userId,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    if (!params.userId || !params.password) {
      const error = new Error("Not allowed null (userId, password)");
      logger.error(error.toString());

      res.status(500).json({ error: error.toString() });
    }
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // token 생성
    const token = tokenUtil.makeToken(result);
    res.set("token", token); // header settings

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  token,
};
