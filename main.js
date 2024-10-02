const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
	],
});

client.setMaxListeners(20);

client.commands = new Collection();

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.login(config["Opcje"].token);