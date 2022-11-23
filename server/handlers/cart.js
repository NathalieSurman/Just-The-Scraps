const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

// --- We want a function to GET everything in the cart --//

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- find a array in the collection "cart" -----//
    const cart = await db.collection("cart").find().toArray();
    cart
      ? res.status(200).json({
          status: 200,
          data: cart,
          message: "cart successfully",
        })
      : res
          .status(404)
          .json({ status: 404, data: cart, message: " cart error" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// --- We want a function to POST fabric items in the cart ----//

const addToCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = uuidv4();
  const _id = parseInt(req.body._id);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    const addItem = req.body;
    addItem.id = id;
    //----- add a object in the collection "cart"-----//
    const addCart = await db.collection("cart").insertOne(addItem);
    addCart
      ? res.status(200).json({ status: 200, data: addCart })
      : res.status(404).json({ status: 404, message: "error" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

//-- We need a function to PATCH the cart this will Update the  data---//

const updateCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);

    const _id = parseInt(req.body._id);
    const cartQuantity = parseInt(req.body.cartQuantity);

    //----- find one _id in the collection "cart"-----//
    const findCart = await db.collection("cart").findOne({ _id });

    //----- find one _id and update it in the collection "fabric"-----//
    const result = await db
      .collection("fabric")
      .findOneAndUpdate({ _id: _id }, { $inc: { numInStock: -cartQuantity } });

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(400).json({ status: 400, message: "item not found" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// --- We need a function that will DELETE the specified fabric in cart (with a remove button) ----//

const deleteCartItem = async (req, res) => {
  const id = req.params.id;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- find a id and delete it in the collection "cart" -----//
    const cartDelete = await db.collection("cart").findOneAndDelete({ id: id });
    cartDelete
      ? res.status(201).json({
          status: 201,
          data: cartDelete,
          message: "deleted successfully",
        })
      : res
          .status(404)
          .json({ status: 404, data: cartDelete, message: "invalid" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// -- We need a function to DELETE everything in the  cart ----//

const deleteCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const dbName = "justfabrics";
    const db = client.db(dbName);
    //----- delete the collection  "fabric" -----//
    const cartDelete = await db.collection("cart").deleteMany({});
    !cartDelete
      ? res
          .status(404)
          .json({ status: 404, data: cartDelete, message: "invalid" })
      : res.status(201).json({
          status: 201,
          data: cartDelete,
          message: "deleted successfully",
        });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getCart,
  addToCart,
  deleteCartItem,
  updateCart,
  deleteCart,
};
