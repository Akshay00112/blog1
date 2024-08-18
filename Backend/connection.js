const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://bob:bob@cluster0.w78d82x.mongodb.net/stdb?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
