module.exports.run = async (bot, message, args, prefix) => {
  if (args.length < 1) {
    message.channel.send(`${message.author}\nVocê precisa escrever o que eu devo dizer!`);
  } else {
    const webhook = await message.channel.createWebhook(message.member.displayName, message.author.avatarURL).catch(error => console.log(error))
    webhook.send(message.content.slice(prefix.length + 3).trim());
    webhook.delete();
    message.delete();
  }
}