const { Department } = require("../models/");

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
