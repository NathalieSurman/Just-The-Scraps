const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//------This is a function that will  GET all the fabrics--------//

const getAllFabrics = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //connect to the client
  await client.connect();
  try {
    const dbName = "justfabrics";
    //connect to the database in the mongodb
    const db = client.db(dbName);

    //----- We want to find array in the collection "fabric"-----//
    const allFabrics = await db.collection("fabric").find().toArray();

    allFabrics
      ? res.status(200).json({ status: 200, data: allFabrics })
      : res.status(404).json({ status: 404, message: "invalid search" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message }); //this is to make it not run twice
  }
  // close the connection to the database server
  client.close();
};

//-----function to GET a one of the fabric --------//

const getFabric = async (req, res) => {
  const _id = req.params._id;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- find one object in the collection "fabric"-----//
    const fabric = await db.collection("fabric").findOne({ _id: _id });
    if (!fabric) {
      res.status(404).json({ status: 404, message: "invalid search" });
    } else {
      res.status(200).json({ status: 200, data: fabric });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getAllFabrics,
  getFabric,
};
