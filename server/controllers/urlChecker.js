const axios = require("axios");
const config = require("../utils/constants"); // Import config.js
const { UserModel, incrementRequestCount } = require("../models/User");
const { incrementTotalRequestCount } = require("../models/Metadata");

const checker = async (req, res) => {
  const urlToCheck = req.body.url;

  const userId = req.headers["userid"];
  console.log(req.headers);
  if (!userId) {
    return res.status(400).send("userId is missing in the header");
  }
  console.log(urlToCheck);

  if (!urlToCheck) {
    return res
      .status(400)
      .json({ error: "URL is required in the request body" });
  }

  const headers = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
    "x-apikey": config.VIRUS_TOTAL_API_KEY, // Use from config
  };
  console.log("url to check= " + urlToCheck);
  const data = new URLSearchParams({ url: urlToCheck });

  try {
    const vturl = `${config.VIRUS_TOTAL_BASE_URL}/urls`;
    const response = await axios.post(vturl, data, { headers });
    if (response.status === 200) {
      const responseData = response.data;
      const analysisId = responseData.data.id;
      const base64Id = analysisId.split("-")[1];

      const getResponse = await axios.get(
        `${config.VIRUS_TOTAL_BASE_URL}/urls/${base64Id}`,
        { headers }
      );

      if (getResponse.status === 200) {
        const phishingStatus = checkPhishing(getResponse.data);
        await incrementRequestCount(userId);
        await incrementTotalRequestCount();

        return res
          .status(200)
          .json({ url: urlToCheck, phishing_status: phishingStatus });
      } else {
        return res.status(500).json({
          error: "Failed to retrieve analysis details",
          details: getResponse.data,
        });
      }
    } else {
      return res
        .status(500)
        .json({ error: "Failed to analyze URL", details: response.data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "API request failed", details: error.message });
  }
};

const checkPhishing = (responseData) => {
  const analysisResults =
    responseData?.data?.attributes?.last_analysis_results || {};

  for (const engine in analysisResults) {
    if (analysisResults[engine]?.result === "phishing") {
      return "phishing";
    }
  }

  return "not phishing";
};

module.exports = checker;
