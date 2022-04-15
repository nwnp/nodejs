const logger = require("../lib/logger.js");
const departmentService = require("../service/departmentService.js");

const signup = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;
    const params = {
      name,
      code,
      description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 입력값 체크
    if (!params.name) {
      const err = new Error("Not allowed null name");
      logger.error(err.toSring());
      res.status(500).json({ err: err.toString() });
    }

    // 비지니스 로직 호출
    const result = await departmentService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  signup,
};
