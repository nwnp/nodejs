const logger = require("../lib/logger.js");
const departmentDao = require("../dao/departmentDao.js");

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentServicereg) ${JSON.stringify(inserted)}`);
    } catch (error) {
      logger.error(`(departmentService.reg) ${error.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;
