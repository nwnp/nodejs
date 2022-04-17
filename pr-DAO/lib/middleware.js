const logger = require("./logger.js");
const tokenUtil = require("./tokenUtil.js");

const middleware = {
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;

    if (token) {
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        const newToken = tokenUtil.makeToken(decoded);
        res.set("token", newToken);
        next();
      } else {
        const err = new Error("Unauthorized token");
        logger.error(err.toString());
        res.status(401).json({ err: err.toString() });
      }
    } else {
      const err = new Error("Unauthorized token");
      logger.error(err.toString());

      res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = middleware;
