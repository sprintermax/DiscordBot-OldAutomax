const comando = require('discord.js-commando');
const bot = new comando.Client({
    commandPrefix: 's!',
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

const prefix = "s!";
var MinecraftDeaths = [
    ' foi esmagado(a) por uma bigorna em queda',
    ' foi espetado(a) até a morte',
    ' morreu afogado(a)',
    ' explodiu',
    ' caiu no chão com muita força',
    ' foi esmagado(a) por um bloco em queda',
    ' explodiu com um estrondo',
    ' experimentou energia cinética',
    ' morreu',
    ' pegou fogo',
    ' sufocou-se em uma parede',
    ' tentou nadar na lava',
    ' foi atingido(a) por um raio',
    ' foi morto(a) por magia',
    ' descobriu que o chão era de lava',
    ' queimou até a morte',
    ' caiu para fora do mundo',
    ' caiu de um lugar alto',
    ' caiu de uma escada',
    ' caiu de algumas vinhas',
    ' foi condenado(a) a cair'
];

/*bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'diversão para todos do servidor!'
        }
    });
}); */

bot.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return;
 
    if (command === "hug") {
        if (args.length < 1){
            message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer abraçar!`);
        } else {
            let [user] = args;
            message.channel.send(`${message.author} abraçou ${user}!`);
        }
    } else
    if (command === "dado") {
        var dicevalue = Math.floor(Math.random() * 6 ) + 1;
        message.channel.send(`${message.author} Jogou um dado e obteve o número ${dicevalue}`);
    } else
    if (command === "kill") {
        if (args.length < 1){
            message.channel.send(`${message.author}\nVocê precisa especificar quem ou o quê você quer matar!`);
        } else {
            let [user] = args;
            var killmessage = MinecraftDeaths[Math.floor(Math.random() * MinecraftDeaths.length)];
            message.channel.send(`${user}${killmessage}`);
        }
    } else
    if (command === "001") {
        let [user, sex, location] = args;
        message.channel.send(`${message.author.username} abraçou ${age} year old ${sex} from ${location}. Wanna date?`);
    }
});

bot.login('NjIyMjA2MjI4MTgxMDI0NzY4.XXwhCA.NXQTqgjih4gt2lTQQw1zmmeOtDk');