module.exports.run = async (message, args) => {
    if (args.length < 2){
        message.channel.send(`${message.author}\nVocê precisa especificar quem e o quê irá receber.`);
    } else {
        let [user, item, quantidade] = args;
        if (args[2]) {
            var quantity = `${quantidade} `;
        } else {
            var quantity = ``;
        }
        message.channel.send(`Dado ${quantity}${item} para ${user}`);
    }
}