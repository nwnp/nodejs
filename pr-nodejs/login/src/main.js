// @ts-check

const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`);
});
