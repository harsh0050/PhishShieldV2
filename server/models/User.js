const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  requestCount: {
    type: Number,
    default: 0, // Default value set to 0
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const UserModel = mongoose.model("Users", Userschema);

async function isAdmin(userId) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return false;
    } else {
      return user.isAdmin;
    }
  } catch (err) {
    return false;
  }
}
async function getUserCount() {
  try {
    const count = await UserModel.countDocuments();

    if (!count) {
      return 0;
    } else {
      return count;
    }
  } catch (err) {
    return 0;
  }
}

async function incrementRequestCount(userId) {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId, // The user's ObjectId
      { $inc: { requestCount: 1 } }, // Increment requestCount by 1
      { new: true } // Return the updated user document
    );

    if (!user) {
      console.log("User not found");
    } else {
      console.log("Updated user:", user);
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }
}

async function getRequestCount(userId) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return -1;
    } else {
      console.log("Updated user:", user);
      return user.requestCount;
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }
}

module.exports = { UserModel, incrementRequestCount, getUserCount, isAdmin };
