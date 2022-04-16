const { sequelize } = require("./connection.js");
const Department = require("./department.js");
const User = require("./user.js");

const db = {};

db.sequelize = sequelize;

// model 생성
db.Department = Department;
db.User = User;

// model 초기화
Department.init(sequelize);
User.init(sequelize);

Department.associate(db);
User.associate(db);

module.exports = db;
