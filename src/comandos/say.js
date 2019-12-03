const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
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
          mensagem = message.content.slice(prefix.length + 4).trim();
          const webhook = await message.channel.createWebhook(message.member.displayName, message.author.avatarURL).catch(error => console.log(error));
          webhook.send(mensagem);
          webhook.delete();
          message.delete();
          return;
        }
      } else {
        if (args.length < 2 && message.attachments.size == 0) {
          message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
          return;
        } else {
          if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
            mensagem = message.content.slice(prefix.length + args[0].length + 4).trim();
            if (message.attachments.size > 0) {
              attachment = new discord.Attachment(message.attachments.first().url);
            } else {
              attachment = "";
            }
            const webhook = await message.client.channels.get(channel.id).createWebhook(message.member.displayName, message.author.avatarURL).catch(error => console.log(error));
            webhook.send(mensagem, attachment).then(msg => {
              message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo com a mensagem no Chat especificado:\nhttps://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
              webhook.delete();
              return;
            });
          } else {
            message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no Chat mencionado!`);
            return;
          }
        }
      }
    }
}