const client = require('..');
config = require("../config.js");

client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName);
    if (interaction.type == 4 && command.autocomplete) {
        const choices = [];
        await command.autocomplete(interaction, choices);
    }

    if (interaction.type !== 2) return;
    if (!command) return client.commands.delete(interaction.commandName);

    await command.run(client, interaction);
}
)