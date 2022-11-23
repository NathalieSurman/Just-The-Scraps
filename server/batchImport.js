const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const items = require("./data/fabric.json");
// const fakeUsers  = require("./data/fakeUserPost.json"); not sure if i need this

//--- function to POST all the data in the database--- ///

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("TNWS");
    // const allFakeUsers = await db.collection("fakeUsers").insertMany(fakeUsers);
    const allFabrics = await db.collection("fabric").insertMany(items);
  } catch (err) {}

  // close the connection to the database server
  client.close();
};
batchImport();
