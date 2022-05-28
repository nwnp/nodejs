const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://pa12:pa12@cluster0.uxbtc51.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();

  // set
  const users = client.db("fc22").collection("users");
  const cities = client.db("fc22").collection("cities");

  // init
  await users.deleteMany({});
  await cities.deleteMany({});

  // query
  await cities.insertMany([
    {
      name: "seoul",
      population: 1000,
    },
    {
      name: "incheon",
      population: 350,
    },
  ]);

  await users.insertMany([
    {
      name: "foo",
      birthYear: 2000,
      contacts: [
        {
          type: "phone",
          number: "01076018733",
        },
        {
          type: "phone",
          number: "01076018733",
        },
      ],
      city: "incheon",
    },
    {
      name: "bar",
      birthYear: 1994,
      contacts: [
        {
          type: "phone",
          number: "01076018733",
        },
      ],
      city: "incheon",
    },
    {
      name: "baz",
      birthYear: 2010,
    },
    {
      name: "poo",
      birthYear: 1923,
      city: "seoul",
    },
  ]);

  await users.updateOne(
    {
      name: "baz",
    },
    {
      $set: {
        name: "boo",
      },
    }
  );

  // const cursor = users.find({});
  // const cursor = users.find(
  //   {
  //     birthYear: {
  //       $gte: 1994, // 이상
  //     },
  //   },
  //   {
  //     sort: {
  //       birthYear: 1, // -1: 내림차순으로 정렬, 1: 오름차순
  //     },
  //   }
  // );
  // const cursor = users.find({
  //   "contacts.type": "phone",
  // });

  /** join */
  const cursor = users.aggregate([
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "name",
        as: "city_info",
      },
    },
    {
      $match: {
        $or: [
          {
            "city_info.population": {
              $gte: 500,
            },
          },
          {
            birthYear: {
              $gte: 1994,
            },
          },
        ],
      },
    },
    // {
    //   $count: "num_users",
    // },
  ]);

  // await users.deleteOne({ name: "poo" });
  await cursor.forEach(console.log);

  await client.close();
}

main();
