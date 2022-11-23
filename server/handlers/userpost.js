//post delete
//this is so that the users are able to edit the product
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

//--- we need a function to POST a new fabric item product ---//

const createPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const postId = uuidv4();
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    const postSubmit = req.body;
    postSubmit.id = postId;
    //----- add an item in the collection "fabric"-----//
    const post = await db.collection("fabric").insertOne(postSubmit);

    post
      ? res.status(200).json({ status: 200, data: postSubmit })
      : res.status(400).json({ status: 400, data: postSubmit });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

//-- We need a function to PATCH the product the user makes this will Update the  data---//

const updatePost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);

    const _id = parseInt(req.body._id);
    const quantityPost = parseInt(req.body.quantityPost);

    //----- find one _id in the collection "fabric"-----//
    const findFabric = await db.collection("fabric").findOne({ _id });

    //----- find one _id and update it in the collection "fabric"-----//
    const result = await db
      .collection("fabric")
      .findOneAndUpdate({ _id: _id }, { $inc: { numInStock: -quantityPost } });

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "item not found" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// -- We need a function to DELETE in the item product that the user made ----//

const deletePost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- delete the collection  "fabric" -----//
    const deletePost = await db.collection("fabric").deleteMany({});
    !deletePost
      ? res
          .status(404)
          .json({ status: 404, data: deletePost, message: "invalid" })
      : res.status(201).json({
          status: 201,
          data: deletePost,
          message: "Your item has been deleted successfully",
        });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};
module.exports = {
  createPost,
  deletePost,
  updatePost,
};
