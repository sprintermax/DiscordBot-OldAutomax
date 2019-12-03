module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa mencionar quem ou o quê você quer comer!`);
        return;
    } else {
        let comida = message.content.slice(prefix.length).trim().split(`comer `)[1];
        message.channel.send(`${message.author} comeu ${comida}!`);
        return;
    }
}