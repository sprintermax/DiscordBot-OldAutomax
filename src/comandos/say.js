const config = require("../config.json");

const allowedroles = config.serverinfo.allowedtosay;

module.exports.run = async (message, prefix) => {
    if(message.member.roles.some(r=>allowedroles.includes(r.id)) ) {
        message.channel.send(message.content.slice(prefix.length + 3).trim());
      } else {
        message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
      }
}