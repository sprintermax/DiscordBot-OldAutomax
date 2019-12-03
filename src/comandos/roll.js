module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        var choise = Math.floor(Math.random() * 6 + 1);
        message.channel.send(`${message.author} rolei o dado e caiu: **${choise}**`);
        return;
    } else {
        let numbers = Math.floor(args[0]);
        if (isNaN(numbers)) {
          message.channel.send(`${message.author} escolha um número válido de lados`);
          return;
        } else {
          if (numbers <= 1) {
            message.channel.send(`${message.author} você precisa escolher um número maior que 1`);
            return;
          } else {
            var choise = Math.floor(Math.random() * numbers + 1);
            message.channel.send(`${message.author} rolei um dado de ${numbers} faces e caiu: **${choise}**`);
            return;
          }
        }
    }
}