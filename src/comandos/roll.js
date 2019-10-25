module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        var choise = Math.floor(Math.random() * 6 + 1);
        message.channel.send(`${message.author} rolei o dado e caiu: **${choise}**`);
    } else {
        let numbers = Math.floor(args[0]);
        if (isNaN(numbers)) {
          message.channel.send(`${message.author} escolha um número válido de lados`);
        } else {
          if (numbers <= 1) {
            message.channel.send(`${message.author} você precisa escolher um número maior que 1`);
          } else {
            var choise = Math.floor(Math.random() * numbers + 1);
            message.channel.send(`${message.author} rolei um dado de ${numbers} faces e caiu: **${choise}**`);
          }
        }
    }
}