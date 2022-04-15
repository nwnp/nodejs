const { Op } = require("sequelize");
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

  // user list 조회
  selectList(params) {
    /** sequelize option 설정 */
    // 1. where 검색 조건 설정
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: {
          [Op.like]: `${params.name}`,
        } /* setQuery = { where: { name: 'jin' }} */,
      };
    }
    // 2. order by 정렬 설정
    setQuery.order = [["id", "DESC"]];

    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery, // 세팅된 설정(setQuery)로 실행
      })
        .then((selectList) => {
          resolve(selectList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Department.findByPk(params.id)
        .then((selectInfo) => {
          resolve(selectInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 유저 정보 수정
  update(params) {
    let setQuery = {};

    // body에 userId가 있는지 체크
    if (params.id) {
      setQuery.where = {
        ...setQuery.where,
        id: {
          [Op.like]: `${params.id}`,
        },
      };
    }

    return new Promise((resolve, reject) => {
      Department.update(params, { ...setQuery })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  delete(params) {
    let setQuery = {};
    setQuery.where = {
      ...setQuery.where,
      id: {
        [Op.like]: `${params.id}`,
      },
    };

    return new Promise((resolve, reject) => {
      Department.destroy({ ...setQuery })
        .then((deleted) => {
          resolve(deleted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
