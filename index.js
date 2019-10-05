const comando = require('discord.js-commando');

const config = require("./src/config.json");

const prefix = config.botsettings.prefix;
const token = config.botsettings.token;
const help = require('./src/comandos/help.js');

const bot = new comando.Client({
    commandPrefix: prefix,
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message == "<@!622206228181024768> help" && !message.author.bot && message.guild) {
        help.run(bot, message, args, prefix);
    }

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    try {
        const cmdrunjs = require(`./src/comandos/${command}.js`);
        cmdrunjs.run(bot, message, args, prefix);
    }
    catch(e) {
        message.channel.send(`Esse comando não existe.`);
    }
});

bot.login(token);