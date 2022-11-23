const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const items = require("./data/fabric.json");

//--- function to POST all the data in the database--- ///

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  //   console.log("connected!");
  try {
    const db = client.db("justfabrics");

    const allFabrics = await db.collection("fabric").insertMany(items);
  } catch (err) {}

  // close the connection to the database server
  client.close();
  //   console.log("disconnected!");
};
batchImport();
