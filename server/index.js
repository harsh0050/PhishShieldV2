const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const userRoute = require("./routes/userRoute");
const apiRoute = require("./routes/apiRoute");
const metadataRoute = require("./routes/metadataRoute");

const app = express();
mongoose.connect("mongodb://localhost:27017/user");
const PORT = process.env.PORT || 8080;

app.use(express.json());
// app.use(cors());

app.use(cors());

app.use("/auth", userRoute);
app.use("/api", apiRoute);
app.use("/metadata", metadataRoute);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   UserModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password == password) {
//         res.json("success");
//       } else {
//         res.json("failure");
//       }
//     } else {
//       res.json("User doesnt exist please signup !!");
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   UserModel.create(req.body)
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

app.listen(PORT, () => {
  console.log("server is running");
});
