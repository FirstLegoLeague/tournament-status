const express = require("express");
const fs = require("fs");
const {MockAPIRouter} = require('./mock-api-router.js');
const app = express();

app.set("port", process.env.PORT || 3001);

app.use(MockAPIRouter);

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });