const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ---- We want a function to GET all the categories of fabric types ---//

const getFabricCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);

    //----- We want to find array in the collection "fabric"-----//
    const allFabrics = await db.collection("fabric").find().toArray();

    let categories = [];
    //----- We want a function that will loop and find the right category-----//
    allFabrics.forEach((watch) => {
      if (categories.indexOf(watch.category) === -1) {
        categories.push(watch.category);
      }
    });

    res.status(200).json({ status: 200, categories: categories });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// ---- We need a function to GET a specified category of fabric ---/

const getFabricCategoriesById = async (req, res) => {
  const category = req.params.category;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- find one array in the collection "fabric" for a certain fiber category-----//
    const findCategory = await db
      .collection("fabric")
      .find({ category: category })
      .toArray();

    if (!findCategory) {
      res.status(404).json({ status: 404, message: "invalid search" });
    } else {
      res.status(200).json({ status: 200, data: findCategory });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getFabricCategories,
  getFabricCategoriesById,
};
