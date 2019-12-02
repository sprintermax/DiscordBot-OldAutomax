const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_GUILD") && message.member.hasPermission("MENTION_EVERYONE")) {
    if (args.length < 1 && message.attachments.size == 0) {
      message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
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
        mensagem = message.content.slice(prefix.length + 11).trim();
        var embed = new discord.RichEmbed()
          .setDescription(mensagem)
          .setColor("#25C059")
          .setFooter(`Enviado por: ${message.member.id}`);
        if (message.attachments.size > 0) {
          embed.setImage(message.attachments.first().url);
        }
        message.channel.send("@everyone", embed);
      } else {
        if (args.length < 2 && message.attachments.size == 0) {
          message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
        } else {
          if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
            mensagem = message.content.slice(prefix.length + args[0].length + 11).trim();;
            var embed = new discord.RichEmbed()
              .setDescription(mensagem)
              .setColor("#25C059")
              .setFooter(`Enviado por: ${message.member.id}`);
            if (message.attachments.size > 0) {
              embed.setImage(message.attachments.first().url);
            }
            message.client.channels.get(channel.id).send("@everyone", embed)
            message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo no chat especificado (<#${channel.id}>).`);
          } else {
            message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no chat mencionado!`);
          }
        }
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
  }
}