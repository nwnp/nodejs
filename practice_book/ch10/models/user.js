const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        // static init 메서드의 매개변수와 연결되는 옵션
        // db.sequelize 객체를 넣어야 함
        timestamps: false, // true면 createdAt과 updatedAt 컬럼을 추가함
        underscored: false, // true이면, camel-case가 기본인데 snake case로 바꾸는 옵션
        modelName: "User", // Model 이름을 User로 설정
        tableName: "users", // table 이름 설정
        paranoid: true, // true면 deletedAt 컬럼이 생김
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers", // N:M 관계에서는 as를 사용해야 한다
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings", // 둘 다 User 모델이라 구분되지 않기 때문에
      through: "Follow",
    });
    db.User.hasMany(db.Domain);
  }
};
``;
