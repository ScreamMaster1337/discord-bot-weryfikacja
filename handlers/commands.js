const fs = require('fs');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const chalk = require('chalk-v2');
const config = require("../config.js");

const rest = new REST({ version: '10' }).setToken(config["Opcje"].token);

module.exports = (client) => {
    const commands = [];
    console.log(`-----------` + chalk.cyan("[ KOMENDY ]") + ` -----------`);
    fs.readdirSync('./commands').forEach(async dir => {
        const cmdFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of cmdFiles) {
            const cmd = require(`../commands/${dir}/${file}`);
            commands.push({
                name: cmd.name,
                description: cmd.description,
                type: cmd.type,
                options: cmd.options ? cmd.options : null,
            });

            if (cmd.name) {
                client.commands.set(cmd.name, cmd);
                console.log(chalk.greenBright("[ KOMENDA ]") + ` Załadowano:` + chalk.cyan(` ${file.split('.js')[0]}.js`));
            } else {
                console.log(chalk.greenBright("[ KOMENDA ]") + ` Nie załadowano:` + chalk.redBright(` ${file.split('.js')[0]}.js`));
            }

        }
    });

    (async () => {
        try {
            await rest.put((config["Opcje"].guild) ?
                Routes.applicationGuildCommands((config["Opcje"].client), (config["Opcje"].guild)) :
                Routes.applicationCommands((config["Opcje"].client)),
                { body: commands }
            );
            console.log(`-----------` + chalk.cyan("[ KONTROLA ]") + ` -----------`);
            console.log(chalk.greenBright("[ KONTROLA ]") + ` Zarejestrowano:` + chalk.cyan(` wszystkie komendy`));
        } catch (e) {
            console.log(chalk.greenBright("[ KONTROLA ]") + ` Błąd:` + chalk.cyan(` Nie można zarejestrować wszystkich komend`, e));
        }
    })();
};