const config = require("../config.json");

const minedeaths = config.minecraftdeaths;

module.exports.run = async (bot, message, args) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer matar!`);
    } else {
        let [user] = args;
        var killmessage = minedeaths[Math.floor(Math.random() * minedeaths.length)];
        message.channel.send(`${user} ${killmessage}`);
    }
}