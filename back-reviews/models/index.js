const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./user");
const Hashtag = require("./hashtag");
const Post = require("./post");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Hashtag = Hashtag;
db.Post = Post;

User.init(sequelize);
Hashtag.init(sequelize);
Post.init(sequelize);

User.associate(db);
Hashtag.associate(db);
Post.associate(db);

module.exports = db;
