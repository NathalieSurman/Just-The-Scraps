const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 8000;
//--- This is the endpoint for all the fabrics and to get one of the fabric item------//

const { getAllFabrics, getFabric } = require("./handlers/fabrics");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello There" });
  })
  //---endpoints for the all the fabrics and one fabric ---//
  .get("/fabric", getAllFabrics)
  .get("/fabric/:id")

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
