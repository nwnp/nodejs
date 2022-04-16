const logger = require("../lib/logger.js");
const userDao = require("../dao/userDao.js");

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await userDao.insert(params);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (error) {
      logger.error(`(userSerivce.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  async list(params) {
    let result = null;

    try {
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (error) {
      logger.error(`(userSerivce.list) ${error.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
