const {
  MetadataModel,
  getTotalRequestCount,
  incrementTotalRequestCount,
} = require("../models/Metadata");

const { getUserCount } = require("../models/User");

exports.getTotalRequestCount = async (req, res) => {
  res.status(200).send((await getTotalRequestCount()).toString());
};

exports.getUserCount = async (req, res) => {
  res.status(200).send((await getUserCount()).toString());
};
