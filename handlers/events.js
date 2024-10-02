const fs = require('fs');
const chalk = require("chalk-v2");

module.exports = (client) => {
    console.log(`-----------` + chalk.cyan("[ EVENTY ]") + ` -----------`);
    fs.readdirSync('./events').filter((file) => file.endsWith('.js')).forEach((event) => {
        require(`../events/${event}`);
        console.log(chalk.greenBright("[ EVENT ]") + ` Załadowano:` + chalk.cyan(` ${event.split('.js')[0]}.js`));
    });
}