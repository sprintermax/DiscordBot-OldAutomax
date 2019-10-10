module.exports.run = async (bot, message, args, prefix) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
    if (args.length < 1) {
      message.channel.send(`${message.author}\nVocê precisa escrever o que eu devo dizer!`);
    } else {
      message.channel.send(message.content.slice(prefix.length + 6).trim());
      message.delete();
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
  }
}