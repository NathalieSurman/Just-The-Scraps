const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;
//--- This is the endpoint for all the fabrics and to get one of the fabric item------//
const { getAllFabrics, getFabric } = require("./handlers/fabrics");
//--- -==========================================================================------//

//--- This is the endpoint to get all the fabrics caetegorie and by its id ------//
const {
  getFabricCategories,
  getFabricCategoriesById,
} = require("./handlers/categories");

const { createPost, stockUpdate, deletePost } = require("./handlers/userpost");
//--- -==========================================================================------//

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello There" });
  })

  //#### Endpoints####/
  .post("/create-post", createPost)
  .patch("/update-stock/:_id", stockUpdate) // this updates when you want to buy something
  .delete("/delete-post/:_id", deletePost)

  //---endpoints for the all the fabrics and one fabric ---//
  .get("/fabric", getAllFabrics)
  .get("/fabric/:_id", getFabric)

  //----- this is the endpoint for the fabric categories ----/
  .get("/categories", getFabricCategories)
  .get("/categories/:category", getFabricCategoriesById)

  .listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
