const comando = require('discord.js-commando');

const config = require("./src/config.json");

const prefix = config.botsettings.prefix;
const token = config.botsettings.token;

const pingcmd = require('./src/comandos/ping.js');
const hugcmd = require('./src/comandos/hug.js');
const peixotocmd = require('./src/comandos/peixoto.js');
const killcmd = require('./src/comandos/kill.js');
const givecmd = require('./src/comandos/give.js');
const fncmd = require('./src/comandos/fn.js');

const bot = new comando.Client({
    commandPrefix: prefix,
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const msgtext = message.content;
    const command = args.shift().toLowerCase();

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    if (command == "ping") {
        pingcmd.run(bot, message, args);
    }
    if (command == "hug") {
        hugcmd.run(bot, message, args);
    }
    if (command == "peixoto") {
        peixotocmd.run(bot, message, args);
    }
    if (command == "kill") {
        killcmd.run(bot, message, args);
    }
    if (command == "give") {
        givecmd.run(bot, message, args);
    }
    if (command === "fn") {
        fncmd.run(bot, message, args);
    }
});

bot.login(token);