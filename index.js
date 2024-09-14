const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const { generateUrl } = require("./controllers/url");

//Discord Connect
const { Client, GatewayIntentBits } = require("discord.js");
const shortid = require("shortid");

//MongoDB
const { connectToMongoDB } = require("./config/connect");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

//Model
const Url = require("./models/url");

//MiddleWare
app.use(express.json());

//Route
const urlRoute = require("./routes/url");

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  console.log(`Received shortId parameter: ${req.params.shortId}`);
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  console.log("Database entry:", entry);
  if (!entry) return res.status(404).json("Url Not Found");
  res.redirect(entry.redirectUrl);
});

//Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1]?.trim();
    const shortId = await generateUrl(url);

    return message.reply({
      content: `Your Shortened Url is localhost:${port}/${shortId}`,
    });
  }
  message.reply({
    content: "Hi!! This is Admin Bot from Shri's Server",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong");
});

client.login(your_token);

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
