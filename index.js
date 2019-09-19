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
const saycmd = require('./src/comandos/say.js');

const bot = new comando.Client({
    commandPrefix: prefix,
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    if (command == "ping") {
        pingcmd.run(bot, message);
    }
    if (command == "hug") {
        hugcmd.run(message, args);
    }
    if (command == "peixoto") {
        peixotocmd.run(message, args);
    }
    if (command == "kill") {
        killcmd.run(message, args);
    }
    if (command == "give") {
        givecmd.run(message, args);
    }
    if (command == "say") {
        saycmd.run(message, prefix);
    }
    if (command == "fn") {
        fncmd.run(message, args, prefix);
    }
});

bot.login(token);
