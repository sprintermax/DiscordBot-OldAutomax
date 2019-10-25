const config = require("../config.json");

const minedeaths = config.minecraftdeaths;

module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar quem você quer eliminar!`);
    } else {
        const user = message.mentions.users.first();
        if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
		} else {
            var killmessage = minedeaths[Math.floor(Math.random() * minedeaths.length)];
            message.channel.send(`${user} ${killmessage}`);
        }
    }
}