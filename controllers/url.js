const shortid = require("shortid");
const Url = require("../models/url");

const generateUrl = async (url) => {
  const shortId = shortid.generate();
  if (!url) throw new Error("URL is required");
  // Ensure URL includes protocol if necessary
  const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
  await Url.create({
    shortId: shortId,
    redirectUrl: formattedUrl,
    visitHistory: [],
  });
  console.log(`Stored URL: ${formattedUrl} with shortId: ${shortId}`);
  return shortId;
};

module.exports = { generateUrl };
