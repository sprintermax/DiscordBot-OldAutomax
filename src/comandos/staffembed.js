const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_GUILD") && message.member.hasPermission("MENTION_EVERYONE")) {  
    if (args.length < 1 && message.attachments.size == 0) {
      message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
      return;
    } else {
      var channel;
      if (args.length >= 1) {
        if (args[0].startsWith('<#') && args[0].endsWith('>')) {
          channel = message.mentions.channels.first();
        } else {
          channel = bot.channels.get(args[0]);
        }
      }
      if (!channel) {
        if (message.attachments.size > 0) {
          message.channel.send(`${message.author}\nVocê não pode enviar uma imagem no próprio Chat em que está executado o comando!`);
          return;
        } else {
          mensagem = message.content.slice(prefix.length + 10).trim();
          var embed = new discord.RichEmbed()
            .setDescription(mensagem)
            .setColor("#25C059")
            //.setFooter(`Enviado por: ${message.member.id}`);
          message.channel.send("@everyone", embed);
          return;
        }
      } else {
        if (channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
          if (args.length < 2 && message.attachments.size == 0) {
            message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
            return;
          } else {
            mensagem = message.content.slice(prefix.length + args[0].length + 12).trim();
            var embed = new discord.RichEmbed()
              .setColor("#25C059")
              //.setFooter(`Enviado por: ${message.member.id}`);
            if (mensagem) {
              embed.setDescription(mensagem);
            }
            if (message.attachments.size > 0) {
              embed.setImage(message.attachments.first().url);
            }
            message.client.channels.get(channel.id).send("@everyone", embed).then(msg => {
              message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo com a mensagem no Chat especificado:\nhttps://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
              return;
            });
          }
        } else {
          message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no Chat mencionado!`);
          return;
        }
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
    return;
  }
}