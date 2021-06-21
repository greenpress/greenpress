/**
 * this file used to initiate basic data inside the authentication service
 */
import {mongoUri}  from "../config";
require("../server/models").connect(mongoUri);
const User = require("mongoose").model("User");
const { init } = require("./init-util.js");

init()
  .then(() => {
    console.log("admin created successfully");
    process.exit(0);
  })
  .catch((err:Error) => {
    console.error(err);
    process.exit(1);
  });
