module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
    if (args.length < 2) {
      message.channel.send(`${message.author}\nVocê precisa especificar o ID do chat e da mensagem que eu devo editar!`);
    } else {
      if (args.length >= 1) {
        if (args[0].startsWith('<#') && args[0].endsWith('>')) {
          channel = message.mentions.channels.first();
        } else {
          channel = bot.channels.get(args[0]);
        }
      }
      if (!channel) {
        if (args.length >= 2) {
          mensagem = message.content.slice(prefix.length + args[0].length + 8).trim();
          message.channel.fetchMessage(args[0]).then(msg => {
            if (msg) {
              if (msg.author.id == "622206228181024768") {
                msg.edit(mensagem);
                message.channel.send(`${message.author}\nEditei! Verifique a mensagem especificada para garantir que está tudo certo:\nhttps://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
              } else {
                message.channel.send(`${message.author}\nEu não posso editar uma mensagem que não foi enviada por mim!`);
              }
            }
          }).catch(err => message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa especificar o ID de alguma mensagem`));
        } else {
          message.channel.send(`${message.author}\nVocê precisa especificar o ID da Mensagem que eu devo editar e o novo conteúdo da mensagem!`);
        }
      } else {
        if (channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
          if (args.length >= 3) {
            mensagem = message.content.slice(prefix.length + args[0].length + args[1].length + 10).trim();
            channel.fetchMessage(args[1]).then(msg => {
              if (msg) {
                if (msg.author.id == "622206228181024768") {
                  msg.edit(mensagem);
                  message.channel.send(`${message.author}\nEditei! Verifique a mensagem especificada para garantir que está tudo certo:\nhttps://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
                } else {
                  message.channel.send(`${message.author}\nEu não posso editar uma mensagem que não foi enviada por mim!`);
                }
              }
            }).catch(err => message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa especificar o Chat em que a mensagem está!`));
          } else {
            message.channel.send(`${message.author}\nVocê precisa especificar o Chat, o ID da Mensagem que eu devo editar e o novo conteúdo da mensagem!`);
          }
        } else {
          message.channel.send(`${message.author}\nVocê não tem permissão para mandar mensagens no chat mencionado!`);
        }
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
  }
}