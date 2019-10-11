module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
    if (message.member.hasPermission("MANAGE_GUILD")) {
        if (args.length < 1){
            message.channel.send(`${message.author}\nVocê precisa especificar qual prefixo deseja colocar!`);
        } else {
            db.get(message.guild.id)
            .find({guildid: message.guild.id}).assign({prefix: args[0]}).write()
            message.channel.send(`${message.author} Prefixo alterado para: \`${args[0]}\``);
        }
    } else {
        message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
    }
}