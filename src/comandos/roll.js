function freeze(time) {
  const stop = new Date().getTime() + time;
  while(new Date().getTime() < stop);       
}

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
            message.channel.send(`${message.author}\nIrei sortear um número de 1 a ${numbers}...`).then( m => {
              m.edit (`${message.author}\nSorteando algum número de 1 a ${numbers}... **\`${Math.floor(Math.random() * numbers + 1)}\`**`);
              freeze(500);
              m.edit (`${message.author}\nSorteando algum número de 1 a ${numbers}... **\`${Math.floor(Math.random() * numbers + 1)}\`**`);
              freeze(500);
              m.edit (`${message.author}\nSorteando algum número de 1 a ${numbers}... **\`${Math.floor(Math.random() * numbers + 1)}\`**`);
              freeze(500);
              m.edit (`${message.author} **Terminei!**\nSorteei um número de 1 a ${numbers} e caiu: **\`${choise}\`**`);
            });
            return;
          }
        }
    }
}