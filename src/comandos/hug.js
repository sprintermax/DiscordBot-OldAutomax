module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa mencionar quem você quer abraçar!`);
    } else {
        var user;
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            user = message.mentions.users.first();
        } else {
            user = bot.users.get(args[0]);
        }
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
		} else {
            message.channel.send(`${message.author} abraçou ${user}!`);
        }
    }
}