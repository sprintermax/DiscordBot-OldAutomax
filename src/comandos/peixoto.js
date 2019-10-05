const discord = require('discord.js');

const config = require("../config.json");

const peixotos = config.peixotoimages;

module.exports.run = async (bot, message, args, prefix) => {
    var peixoto = peixotos[Math.floor(Math.random() * peixotos.length)];
    if (args.length < 1){
        message.channel.send(`${message.author} aqui está o Peixoto:`, new discord.Attachment(peixoto, 'peixoto.png'));
    } else {
        let [user] = args;
        message.channel.send(`${message.author} mostrou o Peixoto para ${user}!`, new discord.Attachment(peixoto, 'peixoto.png'));
    }
}