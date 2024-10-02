const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require("chalk-v2");
const config = require('../config.js');

client.on('ready', () => {
  const activityList = [
    { name: config["Opcje"].nazwa, type: ActivityType.Watching }
  ];

  let i = 0;
  setInterval(() => {
    if (i >= activityList.length) i = 0;
    client.user.setActivity(activityList[i]);
    i++;
  }, 1000);

  console.log(`-----------` + chalk.cyan("[ INFORMACJE ]") + ` -----------`);
  console.log(chalk.cyan("STUDIO:") + ` M4CODE.PL`);
  console.log(chalk.cyan("DEVELOPER:") + ` ScreamMaster1337`);
  console.log(chalk.cyan("BOT WYKONANY DLA:") + ` M4CODE.PL`);
  console.log(`-----------` + chalk.cyan("[ INNE ]") + ` -----------`);

  console.log(chalk.greenBright("[ LOGOWANIE ]") + ` Zalogowano jako: ${client.user.tag}`);
});