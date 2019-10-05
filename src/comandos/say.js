const config = require("../config.json");

module.exports.run = async (bot, message, args, prefix) => {
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(message.content.slice(prefix.length + 3).trim());
      } else {
        message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
      }
}