/* eslint-disable no-undef */

const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

test("retrieve user json", async () => {
  const result = await request.get("/15").accept("application/json");

  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  });
});

test("retrieve user page", async () => {
  const result = await request.get("/15").accept("text/json");

  expect(result.text).toMatch(/^<html>.*<\/html>$/);

  console.log(result.text);
});

// nickname을 업데이트하는 test
// api가 없기 때문에 404
test("updated nickname", async () => {
  const newNickname = "newNickname";

  const res = await request.post("/15").send({ nickname: newNickname });
  expect(res.status).toBe(200);

  const userResult = await request.get("/15").accept("application/json");
  expect(userResult.status).toBe(200);
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  });
});
