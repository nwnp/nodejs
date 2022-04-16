const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        departmentId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        userId: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(20),
        },
        email: {
          type: Sequelize.STRING(255),
        },
        phone: {
          type: Sequelize.STRING(255),
        },
        updatedPwDate: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        paranoid: false,
        modelName: "User",
        tableName: "users",
      }
    );
  }
  static associate(db) {
    db.User.belongsTo(db.Department, {
      foreignKey: {
        name: "departmentId",
        onDelete: "SET NULL",
        as: "Department",
      },
    });
  }
};
