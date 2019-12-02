const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar o usuário para eu pegar a imagem de perfil!`);
    } else {
        var user;
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            user = message.mentions.users.first();
        } else {
            user = bot.users.get(args[0]);
        }
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa especificar algum usuário desse Servidor`);
		} else {
            var embed = new discord.RichEmbed()
            .setDescription(`**Aqui está, a imagem de perfil de ${user}:**`)
            .setColor("#25C059")
            .setImage(`${user.avatarURL}?size=2048`);
            message.channel.send(`${message.author}`, embed);
        }
    }
}