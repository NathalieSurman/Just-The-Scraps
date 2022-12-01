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

  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    const post = req.body.newPost;
    const location = req.body.location;
    const image = req.body.image;
    const size = req.body.size;
    const user = req.body.user;
    const category = req.body.category;
    const postSubmit = { ...req.body, _id: uuidv4() };

    //----- add an item in the collection "fabric"-----//
    await db.collection("fabric").insertOne(postSubmit);

    // //we want to find the fabric post
    // const fabricPosts = await db
    //   .collection("fabric")
    //   .findOne({ _id: res.body._id });

    // if (fabricPosts.posts) {
    //   fabricPosts.posts.push({
    //     user: user,
    //     post: post,
    //     image: image,
    //     location: location,
    //     size: size,
    //     category: category,
    //   });

    //   await db
    //     .collection("fabric")
    //     .updateOne(
    //       { _id: req.body._id },
    //       { $set: { posts: fabricPosts, posts } }
    //     );

    res.status(200).json({ status: 200, data: postSubmit });
    // } else {
    //   await db.collection("fabric").updateOne(
    //     { _id: req.body._id },
    //     {
    //       $set: {
    //         posts: [
    //           {
    //             user: user,
    //             post: post,
    //             image: image,
    //             location: location,
    //             size: size,
    //             category: category,
    //           },
    //         ],
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

//-- We need a function to PATCH the product the user makes this will Update the  data---//

const postUpdate = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);

    const _id = req.params._id;

    //----- find the fabric that users want to buy"-----//
    const findFabric = await db.collection("fabric").findOne({ _id });
    console.log("findFabric", findFabric);
    findFabric.isAvailable = false;
    //whatever was avalible to wtv user is trying to buy
    const updateAvailable = {
      $set: { isAvailable: findFabric.isAvailable },
    };

    await db.collection("fabric").updateOne({ _id: _id }, updateAvailable);
    //----- find one _id and update it in the collection "fabric"-----//
    // const result = await db
    //   .collection("fabric")
    //   .findOneAndUpdate({ _id: _id }, { $inc: { numInStock: -quantityPost } });

    res.status(200).json({ status: 200, message: "stock is updated" });
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
    const _id = req.params._id;
    //----- delete the collection  "fabric" -----//
    const deletePost = await db.collection("fabric").deleteOne({ _id: _id });
    !deletePost.deletedCount
      ? res
          .status(404)
          .json({ status: 404, data: deletePost, message: "invalid" })
      : res.status(204).json({
          status: 204,
          data: deletePost,
          message: "Your item has been deleted successfully",
        });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// get user posts
const getUserPosts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);

    const name = req.params.name;

    const allFabrics = await db.collection("fabric").find().toArray();

    const userFabrics = allFabrics.filter(
      (fabric) => fabric.user && fabric.user.name === name
    );

    res.status(200).json({ status: 200, data: userFabrics });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  createPost,
  deletePost,
  postUpdate,
  getUserPosts,
};
