# Setup (about 10 minutes)

1. discord.com/developers/applications -> New Application -> Bot -> Reset Token (copy it).
   On the Bot page turn ON "Server Members Intent". Invite the bot to your server (OAuth2 -> URL Generator -> scope "bot").
2. Discord: Settings -> Advanced -> Developer Mode ON, right-click your server -> Copy Server ID.
3. Add the Bloxlink bot to your server and get an API key from Bloxlink's developer page (check their docs for the current endpoint/key steps).
   Players must have linked their Roblox account with Bloxlink (blox.link).
4. Host this folder on a free Node host (Render, Railway, Replit...). Set environment variables:
   DISCORD_TOKEN, GUILD_ID, BLOXLINK_KEY. Start command: npm start.
5. In Roblox Studio: Game Settings -> Security -> turn ON "Allow HTTP Requests".
6. Put your public address in the HalloweenLobby server script:
   local DISCORD_VERIFY_URL = "https://your-app.onrender.com/verify"
