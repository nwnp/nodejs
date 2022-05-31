const { Client } = require("pg");
const program = require("commander");
const prompts = require("prompts");

async function connect() {
  const client = new Client({
    user: "jin",
    password: "postgres",
    database: "fc22",
  });

  await client.connect();
  return client;
}

program.command("list").action(async () => {
  const client = await connect();

  const query = `SELECT * FROM users`;
  const result = await client.query(query);
  console.log(result);
  client.end();
});

program.command("add").action(async () => {
  const client = await connect();
  const userName = await prompts({
    type: "text",
    name: "userName",
    message: "Provide a user name to insert.",
  });

  // SQL Injection 보완 전 코드
  // const query = `INSERT INTO users (name) VALUES ('${userName.userName}')`;
  // client.query(query);

  // 보완 후 코드: Secure Coding
  await client.query(`INSERT INTO users (name) VALUES ($1::text)`, [
    userName.userName,
  ]);
  await client.end();
});

program.command("remove").action(async () => {
  const client = await connect();
  const userName = await prompts({
    type: "text",
    name: "userName",
    message: "Provide a user name to insert.",
  });

  // SQL Injection
  // 입력 값을 ' OR '' = ' 입력

  // 보완하기 전 코드
  // const query = `DELETE FROM users WHERE name = '${userName.userName}'`;
  // client.query(query);

  // 보완 후 코드
  await client.query(`DELETE FROM users WHERE name = $1::text`, [
    userName.userName,
  ]);
  await client.end();
});

program.parseAsync();
