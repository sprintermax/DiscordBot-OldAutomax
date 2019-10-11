module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {
    if (args.length < 2) {
      message.channel.send(`${message.author}\nVocê precisa mencionar quem eu devo imitar e o que eu devo dizer!`);
    } else {
      const user = message.mentions.members.first();
      if (!user) {
        message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum Usuário desse servidor!`);
      } else {
        const avatar = message.mentions.users.first().avatarURL;
        const webhook = await message.channel.createWebhook(user.displayName, avatar).catch(error => console.log(error))
        webhook.send(message.content.slice(prefix.length + args[0].length + 6).trim());
        webhook.delete();
        message.delete();
      }
    }
  } else {
    message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
  }
}