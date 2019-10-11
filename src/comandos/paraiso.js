module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
    if (args.length < 1){
        message.channel.send(`${message.author} aqui está o link de convite do **Paraíso do Sprinter**:\nhttps://discord.gg/VxmTj6U`);
    } else {
        const user = message.mentions.users.first();
		if (!user) {
            message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
		} else {
            message.channel.send(`${message.author} convidou ${user} para o **Paraíso do Sprinter**!\nhttps://discord.gg/VxmTj6U`);
        }
    }
}