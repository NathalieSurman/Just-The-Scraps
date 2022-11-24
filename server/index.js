const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;
//--- This is the endpoint for all the fabrics and to get one of the fabric item------//
const { getAllFabrics, getFabric } = require("./handlers/fabrics");
//--- -==========================================================================------//

//--- This is the endpoint to get all the fabric categories and by its id ------//
const {
  getFabricCategories,
  getFabricCategoriesById,
} = require("./handlers/categories");
//--- -==========================================================================------//

//--- This is the endpoint for users to create a Post of an item, to be able to "buy" what is in stock and
//-- We want the stock of the product to update. Finally we want the user to be able to delete their item------//
const { createPost, stockUpdate, deletePost } = require("./handlers/userpost");
//--- -==========================================================================------//

//--- all endpoint for the cart ---//
const {
  getCart,
  addToCart,
  deleteCartItem,
  updateCart,
} = require("./handlers/cart");
//--- -==========================================================================------//

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello There" });
  })

  //#### Endpoints####/

  //---endpoints for the all the fabrics and by its Id  ---//
  .get("/fabric", getAllFabrics)
  .get("/fabric/:_id", getFabric)

  //----- this is the endpoint for the fabric categories ----//
  .get("/categories", getFabricCategories)
  .get("/categories/:category", getFabricCategoriesById)

  //-----This is the endpoint on user post, updated/buying whats in stock and user is able to delete their posted item ----//
  .post("/create-post", createPost)
  .patch("/update-stock/:_id", stockUpdate) // this updates when you want to buy something
  .delete("/delete-post/:_id", deletePost)

  // -- Endpoint for the cart -- //

  .get("/cart", getCart)
  .post("/add-cart", addToCart)
  .patch("/update-cart", updateCart)
  .delete("/delete-cart/:id", deleteCartItem)

  .listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
