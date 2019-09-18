module.exports.run = async (bot, message, args) => {
    message.channel.send(`${message.author}\nVerificando...`).then( m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        m.edit (`Latência do Bot: ${ping}ms\nLatência da API: ${Math.round(bot.ping)}ms`)

    });
}