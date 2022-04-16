const { Op } = require("sequelize");
const { User, Department } = require("../models/index.js");

const dao = {
  // register
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then((inserted) => {
          const insertedResult = { ...inserted };
          delete insertedResult.dataValues.password;
          resolve(inserted);
        })
        .catch((err) => {
          // console.error(err);
          reject(err);
        });
    });
  },

  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}` },
      };
    }
    if (params.userId) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userId,
      };
    }

    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Department,
            as: "Department",
          },
        ],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
