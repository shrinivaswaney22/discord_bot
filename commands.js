const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "Creates a new Shortened Url",
  },
];
const token = "your token";
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const CLIENT_ID = "your discord client id";
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
