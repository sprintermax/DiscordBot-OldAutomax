const comando = require('discord.js-commando');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbfile = new FileSync('./src/database.json')
const db = low(dbfile)

const config = require("./src/config.json");

const defaultprefix = config.botsettings.prefix;
const token = config.botsettings.token;

const bot = new comando.Client({
    commandPrefix: defaultprefix,
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

function CreateGuildCfg(guild) {
    db.set(guild.id, []).write();
    db.get(guild.id)
    .push({
        guildid: guild.id,
        prefix: defaultprefix
    }).write();
 } 

bot.on("guildCreate", guild => {
    CreateGuildCfg(guild);
});

bot.on("message", (message) => {

    if (message.channel.type == "dm") return;
    const guildcfg = db.get(message.guild.id).find({guildid: message.guild.id}).value();
    if (!guildcfg) {
        CreateGuildCfg(message.guild);
        return;
    }
    const prefix = guildcfg.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!message.author.bot && message.guild) {
        if (message.content == "<@622206228181024768> help" || message.content == "<@622206228181024768> ?") {
            message.channel.send(`${message.author} Meu prefixo está configurado para \`${prefix}\`, execute \`${prefix}help\` para obter uma lista dos meus comandos`);
        }
        if (message.content == "<@622206228181024768> resetprefix") {
            if (message.member.hasPermission("MANAGE_GUILD")) {
                db.get(message.guild.id)
                .find({guildid: message.guild.id}).assign({prefix: defaultprefix}).write()
                message.channel.send(`${message.author} Prefixo resetado para o padrão: \`${defaultprefix}\``);
            } else {
                message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
            }
        }
    }

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    try {
        const cmdrunjs = require(`./src/comandos/${command}.js`);
        cmdrunjs.run(bot, message, args, prefix, guildcfg, db);
    }
    catch(e) {
        return;
    }
});

bot.login(token);