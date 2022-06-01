module.exports = {
  /**
   * // @ts-ignore
   * @param {import('sequelize').queryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cities", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.addColumn("users", "cityId", {
      // foreign key 정의
      type: Sequelize.INTEGER,
      references: {
        model: "cities",
        key: "id",
      },
    });
  },

  /**
   * @param {import('sequelize').queryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "cityId");
    await queryInterface.dropTable("cities");
  },
};
