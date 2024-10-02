const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'panel',
    description: "💈 Wysyłanie wiadomości związanych z panelem",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channel',
            description: '💈 Wprowadz id kanału na który chcesz wysłać.',
            type: 7,
            required: true,
        },
        {
            name: 'type',
            description: '💈 Wprowadz id wiadomości która chcesz wysłać.',
            type: 3,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {
        const data = ['weryfikacja'];
        data.forEach(type => {
            choices.push({
                name: `${type}`,
                value: `${type}`
            });
        });
        interaction.respond(choices).catch(console.error);
    },
    run: async (client, interaction) => {
        const requiredRoleID = (config["permisje"].dostęp);

        if (interaction.member.roles.cache.some(role => role.id === requiredRoleID)) {

            const type = interaction.options.get('type').value;
            const channel = interaction.options.get('channel').channel;

            if (type === "weryfikacja") {
                const embed = new EmbedBuilder()
                    .setTitle(config["weryfikacja"].title)
                    .setDescription(config["weryfikacja"].description)
                    .setColor(config["Ogólne"].kolor)
                    .setImage(config["weryfikacja"].image)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({ text: (config["weryfikacja"].footer) })
                    .setTimestamp()

                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(config["weryfikacja"].label)
                            .setStyle(config["Ogólne"].stylguzików)
                            .setCustomId('WERYFIKACJA')
                    )
                channel.send({ embeds: [embed], components: [buttons] });
                interaction.reply({ content: "Wysłałeś wiadomość o id `" + type + "` na kanał <#" + channel.id + ">", ephemeral: true })
            }
        } else {
            const embed = new EmbedBuilder()
                .setTitle(config["permisje"].title)
                .setDescription(config["permisje"].description)
                .setFooter({ text: (config["permisje"].footer) })
                .setColor(config["Ogólne"].kolor)
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
