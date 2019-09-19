const blacklist = require("./blackwords.json");

const denniedwords = blacklist.blackwords;

module.exports.run = async (message) => {
    const words = message.content.split(/ +/g);

    if(words.some(args=> denniedwords.includes(args.toUpperCase()))) {
        message.delete();
        message.channel.send(`${message.author} Sem falar palavreado impróprio seu bobão <:sirtomato:592064961384153110>`);
    }
}
