const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
    var channel;
    if (args.length >= 1) {
      if (args[0].startsWith('<#') && args[0].endsWith('>')) {
        channel = message.mentions.channels.first();
      } else {
        channel = bot.channels.get(args[0]);
      }
    }
    var member;
    if (args.length >= 2) {
      if (args[1].startsWith('<@') && args[1].endsWith('>')) {
        member = message.guild.member(message.mentions.users.first());
      } else {
        member = message.guild.members.get(args[1]);
      }
    }
    if (args.length < 2) {
      if (message.attachments.size == 0) {
        if (!member) {
          message.channel.send(`${message.author}\nVocê precisa especificar quem eu devo imitar e o que eu vou mandar!`);
          return;
        } else {
          message.channel.send(`${message.author}\nVocê precisa especificar o que eu vou mandar!`);
          return;
        }
      } else {
        if (!channel) {
          message.channel.send(`${message.author}\nVocê não pode enviar uma imagem no próprio Chat em que está executado o comando!`);
          return;
        } else {
          message.channel.send(`${message.author}\nVocê precisa especificar quem eu devo imitar!`);
          return;
        }
      }
    } else {
      if (!member) {
        message.channel.send(`${message.author}\n"${args[1]}" é inválido. Você precisa especificar algum Usuário desse servidor!`);
        return;
      } else {
        if (!channel) {
          if (message.attachments.size > 0) {
            message.channel.send(`${message.author}\nVocê não pode enviar uma imagem no próprio Chat em que está executado o comando!`);
            return;
          } else {
            mensagem = message.content.slice(prefix.length + args[0].length + 6).trim();
            const webhook = await message.channel.createWebhook(member.displayName, member.user.avatarURL).catch(error => console.log(error));
            webhook.send(mensagem);
            webhook.delete();
            message.delete();
            return;
          }
        } else {
          if (args.length < 3 && message.attachments.size == 0) {
            message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
            return;
          } else {
            if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
              mensagem = message.content.slice(prefix.length + args[0].length + args[1].length + 8).trim();
              if (message.attachments.size > 0) {
                attachment = new discord.Attachment(message.attachments.first().url);
              } else {
                attachment = "";
              }
              const webhook = await message.client.channels.get(channel.id).createWebhook(member.displayName, member.user.avatarURL).catch(error => console.log(error));
              webhook.send(mensagem, attachment).then(msg => {
                message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo com a mensagem no Chat especificado:\nhttps://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
                webhook.delete();
                return;
              });
            } else {
              message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no Chat especificado (<#${channel.id}>).`);
              return;
            }
          }
        }
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
    return;
  }












}