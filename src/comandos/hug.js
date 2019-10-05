module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer abraçar!`);
    } else {
        let [user] = args;
        message.channel.send(`${message.author} abraçou ${user}!`);
    }
}