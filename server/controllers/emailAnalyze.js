const axios = require("axios");
const config = require("../utils/constants"); // Import config.js

const analyze = async (req, res) => {
  const { emailText } = req.body; // Get "email-text" from request body

  if (!emailText) {
    return res
      .status(400)
      .json({ error: "emailText is required in the request body" });
  }

  const apiUrl = `${config.AI_MODEL_API_BASE_URL}/email`; // Replace with actual API

  try {
    // Send request to external API

    const response = await axios.post(apiUrl, { "email-text": emailText });
    // Return the API response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "API request failed", details: error.message });
  }
};

const extractEmailBodyFromFile = (req, res) =>{
  
}

module.exports = analyze;
