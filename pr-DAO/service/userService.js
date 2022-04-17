const logger = require("../lib/logger.js");
const userDao = require("../dao/userDao.js");
const hashUtil = require("../lib/hashUtil.js");

const service = {
  async login(params) {
    let user = null;

    try {
      user = await userDao.selectUser(params);
      logger.debug(`(userService.login) ${JSON.stringify(user)}`);

      if (!user) {
        const err = new Error("Incorrect userId or password");
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (error) {
      logger.error(`(userService.login) ${error.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    try {
      const checkPasswordHash = await hashUtil.checkPasswordHash(
        params.password,
        user.password
      );
      logger.debug(`(userService.checkPassword) ${checkPassword}`);

      if (!checkPassword) {
        const err = new Error("Incorrect userId or password");
        logger.error(err.toString());

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (error) {
      logger.error(`(userService.checkPassword) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    return new Promise((resolve) => {
      resolve(user);
    });
  },
  async reg(params) {
    let inserted = null;

    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(
        `(userService.makePassword) ${JSON.stringify(params.password)}`
      );
    } catch (error) {
      logger.error(`(userService.makePassword) ${error.toString()}`);
      reject(error);
    }

    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (error) {
      logger.error(`(userSerivce.reg) ${error.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
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
