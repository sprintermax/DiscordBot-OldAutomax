module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa mencionar quem você quer abraçar!`);
    } else {
        const user = message.mentions.users.first();
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
		} else {
            message.channel.send(`${message.author} abraçou ${user}!`);
        }
    }
}