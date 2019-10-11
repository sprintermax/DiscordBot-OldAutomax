module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
    if (args.length < 2){
        message.channel.send(`${message.author}\nVocê precisa mencionar quem e o quê irá receber.`);
    } else {
        const user = message.mentions.users.first();
        let item = args[1];
        let quantidade = args[2];
        if (args[2]) {
            var quantity = `${quantidade} `;
        } else {
            var quantity = ``;
        }
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
		} else {
            message.channel.send(`Dado ${quantity}${item} para ${user}`);
        }
    }
}