const { EmbedBuilder } = require('discord.js');
const client = require('..');
config = require("../config.js");

client.on('interactionCreate', async interaction => {
    if (interaction.customId === "WERYFIKACJA") {
        interaction.member.roles.add(config["weryfikacja"].rola)
        let weryfikacja = new EmbedBuilder()
            .setColor(config["Ogólne"].kolor)
            .setTitle(config["weryfikacja1"].title)
            .setDescription(config["weryfikacja1"].description)
            .setImage(config["weryfikacja1"].image)
            .setFooter({ text: (config["weryfikacja1"].footer) })
            .setTimestamp()
        interaction.reply({ embeds: [weryfikacja], ephemeral: true })
    }
})