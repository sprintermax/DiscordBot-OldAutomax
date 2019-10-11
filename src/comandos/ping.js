module.exports.run = async (bot, message, args, prefix, guildcfg, db) => {
    message.channel.send(`Verificando...`).then( m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        m.edit (`Latência do Bot: ${ping}ms\nLatência da API: ${Math.round(bot.ping)}ms`)

    });
}