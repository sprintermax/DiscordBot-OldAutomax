const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if (args[0]) {
        if ((args[0].startsWith('<:') || args[0].startsWith('<a:')) && args[0].endsWith('>')) {
            emojiid = args[0].trim().split(":").join(">").split(">");
            emoji = message.guild.emojis.get(emojiid[2]) || bot.emojis.get(emojiid[2]);
        } else {
            emoji = message.guild.emojis.get(args[0]) || bot.emojis.get(args[0]) || bot.emojis.find(emoji => emoji.name == args[0]);;
        }
        if (emoji) {
            if (emoji.animated) {
                var embed = new discord.RichEmbed()
                    .setAuthor("DADOS DO EMOJI:")
                    .setDescription(`Nome: **${emoji.name}**\nID: **${emoji.id}**\nTags: **Animado**, [**Download**](https://cdn.discordapp.com/emojis/${emoji.id}.gif)`)
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.gif`)
                    .setColor("#25C059")
                message.channel.send(embed);
                message.delete();
                return;
            } else {
                var embed = new discord.RichEmbed()
                    .setAuthor("DADOS DO EMOJI:")
                    .setDescription(`Nome: **${emoji.name}**\nID: **${emoji.id}**\nTags: [**Download**](https://cdn.discordapp.com/emojis/${emoji.id}.png)`)
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png`)
                    .setColor("#25C059")
                message.channel.send(embed);
                message.delete();
                return;
            }
        } else {
            message.channel.send(`${message.author}\nNão encontrei o emoji, verifique se você especificou um emoji válido!\n(Emojis padrões do Discord ou de outros servidores que eu não estou não são válidos)`);
            return;
        }
    } else {
        message.channel.send(`${message.author}\nVocê precisa especificar o ID do emoji, ou mandar o emoji que você quer!`);
        return;
    }
}