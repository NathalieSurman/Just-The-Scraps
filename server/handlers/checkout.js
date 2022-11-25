"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient, ObjectId } = require("mongodb"); //things that come from mongo

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//this need POST you also need to update availible of item
// ----- making a POST to the checkout-----//
const addCheckout = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //connect to the client
  await client.connect();

  try {
    //connect to the database
    const dbName = "justfabrics";
    const db = client.db(dbName);

    //looking at the key
    const query = { _id: req.body._id };

    // contains the values
    //we want to available fabric item
    const newValues = { $set: { isAvailable: false } };

    //adds data to the database!
    await db.collection("checkout").insertOne(req.body); //making a new database called checkout
    await db.collection("fabric").updateOne(query, newValues); // you want to update the fabric when you checkout the item

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message }); //this is to make it not run twice
  }
  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

module.exports = {
  addCheckout,
};
