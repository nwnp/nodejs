const logger = require("../lib/logger.js");
const departmentDao = require("../dao/departmentDao.js");

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await departmentDao.insert(params);
      logger.debug(`(departmentService.reg) ${JSON.stringify(inserted)}`);
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

  // selectList
  async list(params) {
    let result = null;

    try {
      result = await departmentDao.selectList(params);
      logger.debug(`(departmentService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await departmentDao.selectInfo(params);
      logger.debug(`(departmentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(departmentService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async edit(params) {
    let result = null;

    try {
      result = await departmentDao.update(params);
      logger.debug(`(departmentService.edit) ${JSON.stringify(result)}`);
    } catch (error) {
      logger.error(`(departmentService.edit) ${error.toString()}`);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async delete(params) {
    let result = {};
    try {
      result = await departmentDao.delete(params);
      logger.debug(`(departmentSerivce.delete) ${JSON.stringify(result)}`);
    } catch (error) {
      logger.error(`(department.delete) ${error.toString()}`);
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
