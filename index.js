const comando = require('discord.js-commando');

const config = require("./src/config.json");

const prefix = config.botsettings.prefix;
const token = config.botsettings.token;

const bot = new comando.Client({
    commandPrefix: prefix,
    owner: '307331927772364801',
    unknownCommandResponse: false
});

bot.on("message", (message) => {

    if (message.channel.type == "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!message.author.bot && message.guild) {
        if (message.content == "<@622206228181024768> help" || message.content == "<@622206228181024768> ?") {
            message.channel.send(`${message.author} Meu prefixo é \`${prefix}\`, digite \`${prefix}help\` para obter uma lista dos meus comandos`);
        }
    }

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    try {
        const cmdrunjs = require(`./src/comandos/${command}.js`);
        cmdrunjs.run(bot, message, args, prefix);
    }
    catch(e) {
        return;
    }
});

bot.login(token);