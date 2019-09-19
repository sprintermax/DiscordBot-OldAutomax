const discord = require('discord.js');
const fnclient = require('fortnite');

const config = require("../config.json");

const fnstats = new fnclient(config.ftninfo.clientid);

module.exports.run = async (message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\n\`s!fn <pc|xbl|psn> <global|solo|duo|squad> <username>\``);
    } else {
        
        if (args.length < 3){
            message.channel.send(`${message.author} Comando inválido, use:\n\`s!fn <pc, xbl, psn> <global|solo|duo|squad> <username>\``);
            return;
        }

        let [platform, gamemode] = args;
        let user = message.content.slice(prefix.length).trim().split(`fn ${platform}` + ` ${gamemode} `)[1];
        
        if (args[0]) {
            platform = platform.toLowerCase();
            if (platform == "xbl" || platform == "pc" || platform == "psn"){
                var plataforma = `${platform}`;
            } else {
                message.channel.send(`${message.author}\nAs plataformas válidas são \`pc\`, \`xbl\` ou \`psn\``);
                return;
            }
        }

        if (args[1]) {
            gamemode = gamemode.toLowerCase();
            if (gamemode == "solo" || gamemode == "duo" || gamemode == "squad" || gamemode == "global"){
                var gametype = `${gamemode}`;
            }  else {
                message.channel.send(`${message.author}\nOs modos disponíveis são \`global\`, \`solo\`, \`duo\` ou \`squad\``);
                return;
            }
        }
    fnstats.user(user, plataforma).then(data =>{
        let stats = data.stats;
        if (!stats) {
            message.channel.send(`${message.author}\nNão foram encontradas estatísticas para o jogador "${user}"`);
            return;
        }
        if (gametype == "global"){
            modestats = stats.lifetime;
        } else if (gametype == "solo") {
            modestats = stats.solo;
        } else if (gametype == "duo") {
            modestats = stats.duo;
        } else if (gametype == "squad") {
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

        return message.channel.send(`${message.author}\nMostrando estatística **${gametype.toUpperCase()}** de **${data.username}** na plataforma **${plataforma.toUpperCase()}**`, embed);
    })
    }
}