const { Sequelize, DataTypes } = require("sequelize");

async function main() {
  const sequelize = new Sequelize({
    database: "fc22",
    username: "jin",
    password: "postgres",
    dialect: "postgres",
    host: "localhost",
  });

  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  const City = sequelize.define(
    "city",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  User.belongsTo(City); // Many To One 관계

  await sequelize.sync({
    force: true,
  });

  const newCity = City.build({
    name: "Incheon",
  }).save();

  await User.build({
    name: "Coco",
    age: 1,
    cityId: (await newCity).getDataValue("id"),
  }).save();

  await sequelize.authenticate();
  await sequelize.close();
}

main();
