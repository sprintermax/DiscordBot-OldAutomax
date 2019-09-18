const discord = require('discord.js');
const fnclient = require('fortnite');

const config = require("../config.json");

const fnstats = new fnclient(config.fortniteinfo.clientid);

module.exports.run = async (bot, message, args) => {
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

            return message.channel.send(`${message.author}\nMostrando estatística **${gametype}** de **${data.username}** na plataforma **${plataforma}**`, embed);
        })
    }
}