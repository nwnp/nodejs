const Sequelize = require("sequelize");

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
        },
        code: {
          type: Sequelize.STRING(50),
        },
        description: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Department",
        tableName: "departments",
        underscored: false,
        timestamps: true,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    db.Department.hasMany(db.User, {
      foreignKey: { name: "departmentId" },
      onDelete: "SET NULL",
      as: "Users",
    });
  }
};
