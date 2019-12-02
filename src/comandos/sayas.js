const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
    if (args.length < 2) {
      message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
    } else {
      var member, avatar;
      if (args[0].startsWith('<@') && args[0].endsWith('>')) {
        member = message.guild.member(message.mentions.users.first());
      } else {
        member = message.guild.members.get(args[0]);
      }
      var channel;
      if (args.length >= 1) {
        if (args[1].startsWith('<#') && args[1].endsWith('>')) {
          channel = message.mentions.channels.first();
        } else {
          channel = bot.channels.get(args[1]);
        }
      }
      if (!member) {
        message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum Usuário desse servidor!`);
      } else {
        if (!channel) {
          mensagem = message.content.slice(prefix.length + args[0].length + 6).trim();
          const webhook = await message.channel.createWebhook(member.displayName, member.user.avatarURL).catch(error => console.log(error));
          webhook.send(mensagem);
          webhook.delete();
          message.delete();
        } else {
          if (args.length < 2) {
            message.channel.send(`${message.author}\nVocê precisa especificar o que eu devo mandar!`);
          } else {
            if(channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
              mensagem = message.content.slice(prefix.length + args[0].length + args[1].length + 8).trim();
              const webhook = await message.client.channels.get(channel.id).createWebhook(member.displayName, member.user.avatarURL).catch(error => console.log(error));
              webhook.send(mensagem);
              webhook.delete();
              message.channel.send(`${message.author}\nEnviei! Confira se está tudo certo no chat especificado (<#${channel.id}>).`);
            } else {
              message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no chat mencionado!`);
            }
          }
        }
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
  }












}