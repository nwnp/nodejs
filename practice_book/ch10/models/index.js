const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./user");
const Hashtag = require("./hashtag");
const Post = require("./post");

const Domain = require("./domain");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain; // 추가

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize); // 추가

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db); // 추가

module.exports = db;
