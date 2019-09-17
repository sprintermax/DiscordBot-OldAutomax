const discord = require('discord.js');
const comando = require('discord.js-commando');
const fnclient = require('fortnite');

const config = require("./src/config.json");

const prefix = config.botsettings.prefix;
const token = config.botsettings.token;
const peixotos = config.peixotoimages;
const minedeaths = config.minecraftdeaths;

const fnstats = new fnclient(config.fortniteinfo.clientid);
const bot = new comando.Client({
    commandPrefix: prefix,
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const messagetext = message.content;
    const command = args.shift().toLowerCase();

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || !message.guild) return;

    if (command == "hug") {
        if (args.length < 1){
            message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer abraçar!`);
        } else {
            let [user] = args;
            message.channel.send(`${message.author} abraçou ${user}!`);
        }
    }
    if (command == "peixoto") {
        var peixoto = peixotos[Math.floor(Math.random() * peixotos.length)];
        if (args.length < 1){
            message.channel.send(`${message.author} aqui está o Peixoto:`, new discord.Attachment(peixoto, 'peixoto.png'));
        } else {
            let [user] = args;
            message.channel.send(`${message.author} mostrou o Peixoto para ${user}!`, new discord.Attachment(peixoto, 'peixoto.png'));
        }
    }
    if (command == "kill") {
        if (args.length < 1){
            message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer matar!`);
        } else {
            let [user] = args;
            var killmessage = minedeaths[Math.floor(Math.random() * minedeaths.length)];
            message.channel.send(`${user} ${killmessage}`);
        }
    }
    if (command == "give") {
        if (args.length < 2){
            message.channel.send(`${message.author}\nVocê precisa especificar quem e o quê irá receber.`);
        } else {
            let [user, item, quantidade] = args;
            if (args[2]) {
                var quantity = `${quantidade} `;
            } else {
                var quantity = ``;
            }
            message.channel.send(`Dado ${quantity}${item} para ${user}`);
        }
    }
    if (command === "fn") {
        if (args.length < 1){
            message.channel.send(`${message.author}\ns!fn <Username> <pc, xbl, psn> <global, solo, duo, squad>`);
        } else {
            let [user, platform, gamemode] = args;
            if (args[1]) {
                platform = platform.toLowerCase();
                if (platform == "xbl" || platform == "pc" || platform == "psn"){
                    var plataforma = `${platform}`;
                } else {
                    message.channel.send(`${message.author}\nAs plataformas válidas são "pc", "xbl" ou "psn"`);
                    return;
                }
            } else {
                args[1] = `pc`;
                var plataforma = `pc`;
            }
            if (args[2]) {
                gamemode = gamemode.toLowerCase();
                if (gamemode == "solo" || gamemode == "duo" || gamemode == "squad" || gamemode == "global"){
                    var gametype = `${gamemode}`;
                }  else {
                    message.channel.send(`${message.author}\nOs modos disponíveis são "global", "solo", "duo" ou "squad"`);
                    return;
                }
            } else {
                args[2] = `global`;
                var gametype = `global`;
            }

            fnstats.user(user, plataforma).then(data =>{
                let stats = data.stats;
                if (!stats) {
                    message.channel.send(`${message.author}\nNão foram encontradas estatísticas para o jogador "${user}"`);
                    return;
                }
                if (gametype === "global"){
                    modestats = stats.lifetime;
                } else if (gametype === "solo") {
                    modestats = stats.solo;
                } else if (gametype === "duo") {
                    modestats = stats.duo;
                } else if (gametype === "squad") {
                    modestats = stats.squad;
                }
                let matches = modestats.matches;
                let wins = modestats.wins;
                let kills = modestats.kills;
                let kd = modestats.kd;
                
                var msg = "";
                msg += "\nPartidas Jogadas: " + matches;
                msg += "\nEliminações: " + kills;
                msg += "\nVitórias: " + wins;
                msg += "\nK/D: " + kd;

                var embed = new discord.RichEmbed()
                .setAuthor(data.username)
                .setDescription(msg)
                .setColor("#FF00FF")
                .setThumbnail("https://pbs.twimg.com/profile_images/1101123838589452299/rpu5UKTH.png");

                return message.channel.send(`${message.author} Mostrando estatística ${gametype} de ${data.username} na plataforma ${plataforma}`, embed);
            })
        }
    }
});

bot.login(token);