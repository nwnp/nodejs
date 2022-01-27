const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://jin:jin123@boilerplate.zb9dn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function main() {
  const c = await client.connect();
  const users = client.db("fc21").collection("users");

  await users.deleteMany({});
  users.insertMany([
    {
      name: "foo",
    },
    {
      name: "bar",
    },
    {
      name: "baz",
    },
  ]);
  const cursor = users.find({});
  await cursor.forEach(conosle.log);

  await client.close();
}

main();
