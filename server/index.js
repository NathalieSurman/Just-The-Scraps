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

//--- This is the endpoint for users to create a Post of an item, to be able to "buy" what is in post and
//-- We want the post of the product to update. Finally we want the user to be able to delete their item------//
const { createPost, postUpdate, deletePost } = require("./handlers/userpost");
//--- -==========================================================================------//

const { addCheckout } = require("./handlers/checkout");

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

  //-----This is the endpoint on user post, updated a fabric item and user is able to delete their posted item ----//
  .post("/create-post", createPost)
  .patch("/update/:_id", postUpdate)
  .delete("/delete-post/:_id", deletePost)

  // -- Endpoint for the checkout item -- //
  .post("/checkout", addCheckout) // NOT SURE Might not need

  .listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
