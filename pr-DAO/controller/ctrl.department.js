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

const edit = async (req, res, next) => {
  try {
    const params = {
      id: req.body.id,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.update.params) ${JSON.stringify(params)}`);

    const result = await departmentService.edit(params);
    logger.info(`(department.update.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const params = { id: req.body.id };
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    const result = departmentService.delete(params);
    logger.info(`(department.delete.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const info = async (req, res, next) => {
  try {
    const params = {
      id: req.body.id,
    };
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    const result = await departmentService.info(params);
    logger.info(`(department.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};

const list = async (req, res, next) => {
  try {
    const params = {
      name: req.query.name,
    };
    logger.info(`(department.list.params) ${JSON.stringify(params)}`);

    const result = await departmentService.list(params);
    logger.info(`(department.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};

module.exports = {
  signup,
  edit,
  deleteUser,
  list,
  info,
};
