const { sequelize } = require("./connection.js");
const Department = require("./department.js");

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;

// model 초기화
Department.init(sequelize);

module.exports = db;
