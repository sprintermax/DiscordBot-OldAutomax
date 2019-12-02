const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
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
        mensagem = message.content.slice(prefix.length + 4).trim();
        const webhook = await message.channel.createWebhook(message.member.displayName, message.author.avatarURL).catch(error => console.log(error));
        webhook.send(mensagem);
        webhook.delete();
        message.delete();
      } else {
        if (args.length < 2 && message.attachments.size == 0) {
          message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
        } else {
          if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
            mensagem = message.content.slice(prefix.length + args[0].length + 4).trim();
            if (message.attachments.size > 0) {
              attachment = new discord.Attachment(message.attachments.first().url);
            } else {
              attachment = "";
            }
            const webhook = await message.client.channels.get(channel.id).createWebhook(message.member.displayName, message.author.avatarURL).catch(error => console.log(error));
            webhook.send(mensagem, attachment);
            webhook.delete();
            message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo no chat especificado (<#${channel.id}>).`);
          } else {
            message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no chat mencionado!`);
          }
        }
      }
    }
}