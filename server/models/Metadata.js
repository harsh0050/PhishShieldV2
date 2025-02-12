const mongoose = require("mongoose");

const MetadataSchema = new mongoose.Schema({
  totalRequestCount: Number,
});
const MetadataModel = mongoose.model("Metadata", MetadataSchema);

async function incrementTotalRequestCount() {
  try {
    const result = await MetadataModel.findOneAndUpdate(
      {}, // Find any document (assuming there's only one)
      { $inc: { totalRequestCount: 1 } }, // Increment totalRequestCount by 1
      { new: true, upsert: true } // Return updated doc, create if not exists
    );
    console.log("Updated Metadata:", result);
  } catch (error) {
    console.error("Error updating Metadata:", error);
  }
}

async function getTotalRequestCount() {
  try {
    const metadata = await MetadataModel.findOne({});
    if (metadata) {
      console.log("Metadata Record:", metadata);
      return metadata.totalRequestCount;
    } else {
      console.log("No metadata record found.");
      return -1;
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return -1;
  }
}

module.exports = {
  MetadataModel,
  incrementTotalRequestCount,
  getTotalRequestCount,
};
