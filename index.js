// Discord join-checker for the Roblox game.
// GET /verify?userId=<robloxUserId>  ->  {"joined": true|false}
// Uses Bloxlink to turn a Roblox id into a Discord id, then checks that person is in YOUR server.
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;          // your bot token
const GUILD_ID = process.env.GUILD_ID;            // your server id
const BLOXLINK_KEY = process.env.BLOXLINK_KEY;    // Bloxlink API key (see README)
const PORT = process.env.PORT || 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.login(TOKEN);

const app = express();
app.get("/verify", async (req, res) => {
  const userId = String(req.query.userId || "");
  if (!/^\d{1,20}$/.test(userId)) return res.json({ joined: false });
  try {
    const r = await fetch(`https://api.blox.link/v4/public/guilds/${GUILD_ID}/roblox-to-discord/${userId}`, {
      headers: { Authorization: BLOXLINK_KEY },
    });
    if (!r.ok) return res.json({ joined: false });
    const data = await r.json();
    const discordId = data.discordIDs && data.discordIDs[0];
    if (!discordId) return res.json({ joined: false });
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(discordId).catch(() => null);
    res.json({ joined: !!member });
  } catch (e) {
    console.error(e);
    res.json({ joined: false });
  }
});
app.get("/", (_, res) => res.send("ok"));
app.listen(PORT, () => console.log("listening on", PORT));
