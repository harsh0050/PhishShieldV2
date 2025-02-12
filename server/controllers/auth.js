const {UserModel} = require("../models/User");

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  UserModel.findOne({ email: email }).then((user) => {
    
    if (user) {
      if (user.password == password) {
        res.json({ status: "success", userId: user._id.toString() });
      } else {
        res.json("failure");
      }
    } else {
      res.json("User doesnt exist please signup !!");
    }
  });
};

exports.register = (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
