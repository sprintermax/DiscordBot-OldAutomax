const discord = require('discord.js');
const comando = require('discord.js-commando');
const Client = require('fortnite');
const fortnite = new Client('647212b4-e22e-427f-84c6-e40e5daeb24d');
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
    if (command === "give") {
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
    } else
    if (command === "fn") {
if (args.length < 1){
            message.channel.send(`${message.author}\ns!fn <Username> <pc, xbl, psn> <global, solo, duo, squad>`);
        } else {
            let [user, platform, gamemode] = args;
            if (args[1]) {
                platform = platform.toLowerCase();
                if (platform == "xbl" || platform == "pc" || platform == "psn"){
                    var plataforma = `${platform}`;
                } else {
                    message.channel.send(`${message.author}\nAs plataformas válidas são "pc", "xbl" ou "psn"`);
                    return;
                }
            } else {
                var plataforma = `pc`;
            }
            if (args[2]) {
                gamemode = gamemode.toLowerCase();
                if (gamemode == "solo" || gamemode == "duo" || gamemode == "squad" || gamemode == "global"){
                    var gametype = `${gamemode}`;
                }  else {
                    message.channel.send(`${message.author}\nOs modos disponíveis são "global", "solo", "duo" ou "squad"`);
                    return;
                }
            } else {
                var gametype = `global`;
            }

            fortnite.user(user, plataforma).then(data =>{
                let stats = data.stats;
                if (!stats) {
                    message.channel.send(`${message.author}\nNão foram encontradas estatísticas para o jogador "${user}"`);
                    return;
                }
                if (gametype === "global"){
                    modestats = stats.lifetime;
                } else if (gametype === "solo") {
                    modestats = stats.solo;
                } else if (gametype === "duo") {
                    modestats = stats.duo;
                } else if (gametype === "squad") {
                    modestats = stats.squad;
                }
                let matches = modestats.matches;
                let wins = modestats.wins;
                let kills = modestats.kills;
                let kd = modestats.kd;

                let embed = new discord.RichEmbed()
                .setAuthor(`Mostrando estatística ${gametype} de ${data.username} na plataforma ${plataforma}`)
                .setColor("#FF00FF")
                .addField("Vitórias", wins, true)
                .addField("Eliminações", kills, true)
                .addField("Partidas Jogadas", matches, true)
                .addField("K/D", kd, true);

                return message.channel.send(`${message.author} Aqui está:`, embed);
            })
        }
    }
});

bot.login('NjIyMjA2MjI4MTgxMDI0NzY4.XXwhCA.NXQTqgjih4gt2lTQQw1zmmeOtDk');