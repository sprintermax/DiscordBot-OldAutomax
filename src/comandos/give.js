module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 2){
        message.channel.send(`${message.author}\nVocê precisa mencionar quem e o quê irá receber.`);
        return;
    } else {
        var user;
        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            user = message.mentions.users.first();
        } else {
            user = bot.users.get(args[0]);
        }
        let item = args[1];
        let quantidade = args[2];
        if (args[2]) {
            var quantity = `${quantidade} `;
        } else {
            var quantity = ``;
        }
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
            return;
		} else {
            message.channel.send(`Dado ${quantity}${item} para ${user}`);
            return;
        }
    }
}