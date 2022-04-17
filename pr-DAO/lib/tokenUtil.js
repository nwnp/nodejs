const jwt = require("jsonwebtoken");

const secretKey = "SeCrEtKeY";
const options = {
  expiresIn: "2h",
};

const tokenUtil = {
  makeToken(user) {
    const payload = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, secretKey, options);

    return token;
  },

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      return null;
    }
  },
};

module.exports = tokenUtil;
