const express = require("express");
const router = express.Router();
const { generateUrl } = require("../controllers/url");

router.post("/", async (req, res) => {
  try {
    const url = req.body.Url;
    const shortId = await generateUrl(url);
    res.json({ id: shortId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
