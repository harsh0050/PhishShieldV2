const {
  MetadataModel,
  getTotalRequestCount,
  incrementTotalRequestCount,
} = require("../models/Metadata");

const { getUserCount, isAdmin } = require("../models/User");

exports.getTotalRequestCount = async (req, res) => {
  res.status(200).send((await getTotalRequestCount()).toString());
};

exports.getUserCount = async (req, res) => {
  res.status(200).send((await getUserCount()).toString());
};

exports.isAdmin = async (req, res) => {
  const userId = req.headers["userid"];
  console.log(req.headers);
  if (!userId) {
    res.status(400).send("userId is missing in the header");
  }
  res.status(200).send((await isAdmin(userId)).toString());
};
