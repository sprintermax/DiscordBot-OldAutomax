const discord = require('discord.js');
const comando = require('discord.js-commando');
const Client = require('fortnite');
const ftnstats = new Client('647212b4-e22e-427f-84c6-e40e5daeb24d');

const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const { ESubGame } = Fortnite;
const { EPartyPrivacy } = require('epicgames-client');
const config = require("./config.json");

const bot = new comando.Client({
    commandPrefix: 's!',
    owner: '307331927772364801',
    disableEveryone: true,
    unknownCommandResponse: false
});

const prefix = "s!";

var DEFAULT_CID = config.default_cid
var DEFAULT_BID = config.default_bid
var DEFAULT_EID = config.default_eid
var DEFAULT_PICKAXE_ID = config.pickaxe_id
var CID = DEFAULT_CID
var BID = DEFAULT_BID
var EID = DEFAULT_EID
var PICKAXE_ID = DEFAULT_PICKAXE_ID

var peixotos = [
    'https://cdn.discordapp.com/attachments/583495087200141324/622875540243611688/peixoto_3.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622875537345347584/2019-07-21_00_35_05-Window.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622875541912944642/2019-07-20_15_28_55-Window.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622877576012234753/unknown.png',
    'https://cdn.discordapp.com/attachments/583491033363513345/622877737996255244/images.png',
    'https://cdn.discordapp.com/attachments/583491033363513345/622877947077984266/images.png',
    'https://cdn.discordapp.com/attachments/583491033363513345/622878137830866944/Z.png',
    'https://cdn.discordapp.com/attachments/583491033363513345/622878758306840586/unknown.png',
    'https://cdn.discordapp.com/attachments/591077338687471618/622878907829321741/maxresdefault.png',
    'https://cdn.discordapp.com/attachments/591077338687471618/622879480368857089/62262187_119947442575487_6031054289039767912_n.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622882527287443489/a7ddef3a23236fd6a7eab388a6664112e57a0376r1-1920-1080v2_00.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622882638285504522/Fishstick.png',
    'https://cdn.discordapp.com/attachments/583495087200141324/622882878820450316/68689104_101374137872999_1973897991852419550_n.png'
];

var MinecraftDeaths = [
    'foi esmagado(a) por uma bigorna em queda',
    'foi espetado(a) até a morte',
    'morreu afogado(a)',
    'explodiu',
    'caiu no chão com muita força',
    'foi esmagado(a) por um bloco em queda',
    'explodiu com um estrondo',
    'experimentou energia cinética',
    'morreu',
    'pegou fogo',
    'sufocou-se em uma parede',
    'tentou nadar na lava',
    'foi atingido(a) por um raio',
    'foi morto(a) por magia',
    'descobriu que o chão era de lava',
    'queimou até a morte',
    'caiu para fora do mundo',
    'caiu de um lugar alto',
    'caiu de uma escada',
    'caiu de algumas vinhas',
    'foi condenado(a) a cair'
];

/*bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'diversão para todos do servidor!'
        }
    });
}); */

let eg = new EGClient({
    email: config.email,
    password: config.password,
    debug: console.log,
    defaultPartyConfig: {
        privacy: EPartyPrivacy.PRIVATE,
        joinConfirmation: false,
        joinability: 'OPEN',
        maxSize: 16,
        subType: 'default',
        type: 'default',
        inviteTTL: 14400,
        chatEnabled: false
    }
});

eg.init().then(async (success) => {

      if(!success)
        throw new Error('Não foi possível inicializar o launcher da Epic Games.');

      if(!await eg.login())
        throw new Error('Não foi possível logar com a conta no Fortnite.');

        const fortnite = await eg.runGame(Fortnite, {
	        netCL: config.netcl,
	        partyBuildId: '1:1:' + config.netcl,
	    });
        const br = await fortnite.runSubGame(ESubGame.BattleRoyale);


      fortnite.communicator.on('party:member:joined', async (member) => {
        console.log(`Member#${member.id} joined!`);
        console.log(`Members count: ${fortnite.party.members.length}`);

          fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/" + DEFAULT_CID + "." + DEFAULT_CID);

          fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + DEFAULT_BID + "." + DEFAULT_BID);

          fortnite.party.me.setPickaxe("/Game/Athena/Items/Cosmetics/Pickaxes/" + DEFAULT_PICKAXE_ID + "." + DEFAULT_PICKAXE_ID);

          fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + DEFAULT_EID + "." + DEFAULT_EID);

          fortnite.party.me.setBattlePass(true, 100, 100, 100);

	      fortnite.party.me.setBanner(config.banner_level, config.banner, config.banner_color);
		  
		  fortnite.communicator.updateStatus(config.custom_status);
      });
	  
	  console.log("[INFO] Traje padrão carregado. (" + CID + ")");
	  console.log("[INFO] Mochila padrão carregada. (" + BID + ")");
	  console.log("[INFO] Picareta padrão carregada. (" + PICKAXE_ID + ")");

      fortnite.communicator.on('party:invitation', async (invitation) => {
        current_party = invitation.party;
        await invitation.accept()
      });

      fortnite.communicator.on('friend:request', async (friendops) => {
        if(config.friendaccept == "true") {
          eg.acceptFriendRequest(friendops.friend.id)
        }else {
          eg.declineFriendRequest(friendops.friend.id)
        }
      });

      bot.on("message", (message) => {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        if (command === "bot") {
          if (message.author.id != 307331927772364801) return message.channel.send(`${message.author}\nVocê não tem permissão para usar esse comando!`);
		  (async () => {
            if(args[0] == ('help')){
              var botcommands = "";
          botcommands += "\ns!bot banner <icon> <color>";
          botcommands += "\ns!bot skin <skin id>";
          botcommands += "\ns!bot emote <emote id>";
          botcommands += "\ns!bot pickaxe <pickaxe id>";
          botcommands += "\ns!bot backpack <backpack id>";
          botcommands += "\ns!bot status <custom status>";
          botcommands += "\ns!bot battlepass <tier> <selfxp> <friendxp>";
          botcommands += "\ns!bot platform <platform: WIN|MAC|AND|IOS|PSN|XBL|SWT>";
          botcommands += "\ns!bot input <input: MouseAndKeyboard|Controller|Touch>";
          botcommands += "\ns!bot unready";
          botcommands += "\ns!bot restart";
          botcommands += "\ns!bot reload";
          botcommands += "\ns!bot ready";
          botcommands += "\ns!bot stop";

          var embed = new discord.RichEmbed()
          .setAuthor("Comandos:")
          .setDescription(botcommands)
          .setColor("#FF00FF");
          return message.channel.send(`${message.author}`,embed);
            }    
            if (args[0] == "banner"){
                  if (args[1]){
                    try {
                      fortnite.party.me.setBanner(100, args[1], args[2]);
                      message.channel.send(`${message.author}\nBanner trocado para ${args[1]} ${args[2]}`);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot banner <icon> <color>`);
                  }
                } else
                if(args[0] == ('skin')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/" + args[1] + "." + args[1]);
                      message.channel.send("Skin alterada para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot skin <skin id>`);
                  }
                } else
                if(args[0] == ('emote')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + args[1] + "." + args[1]);
                      message.channel.send("Emote alterado para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot emote <emote id>`);
                  }
                } else
                if(args[0] == ('pickaxe')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setPickaxe("/Game/Athena/Items/Cosmetics/Pickaxes/" + args[1] + "." + args[1]);
                      message.channel.send("Picareta alterada para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot pickaxe <pickaxe id>`);
                  }
                } else
                if(args[0] == ('backpack')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + args[1] + "." + args[1]);
                      message.channel.send("Mochila alterada para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot backpack <backpack id>`);
                  }
                } else
                if(args[0] == ('status')){
                  if (args[1]){
                    try {
                      var cstatus = message.content.replace("s!bot status", "");
                      fortnite.communicator.updateStatus(cstatus);
                      message.channel.send("Status alterado para " + cstatus);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot status <custom status>`);
                  }
                } else
                if(args[0] == ('reload')){
                  fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/" + DEFAULT_CID + "." + DEFAULT_CID);
                  fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + DEFAULT_BID + "." + DEFAULT_BID);
                  fortnite.party.me.setPickaxe("/Game/Athena/Items/Cosmetics/Pickaxes/" + DEFAULT_PICKAXE_ID + "." + DEFAULT_PICKAXE_ID);
                  fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + DEFAULT_EID + "." + DEFAULT_EID);
                  message.channel.send("Cosméticos Padrões Recarregados");
                } else
                if(args[0] == ('ready')){
                  fortnite.party.me.setReady(true);
                  message.channel.send("Pronto!");
                } else
                if(args[0] == ('unready')){
                  fortnite.party.me.setReady(false);
                  message.channel.send("Preparando!");
                } else
                if(args[0] == ('battlepass')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setBattlePass(true, args[1], args[2], args[3]);
                      message.channel.send("Passe de Batalha alterado para: " + args[1] + ", " + args[2] + ", " + args[3]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot battlepass <tier> <selfxp> <friendxp>`);
                  }
                } else
                if(args[0] == ('stop')){
                  message.channel.send("Emote interrompido!");
                } else
                if(args[0] == ('restart')){
                  fortnite.party.me.clearEmote();
			            fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + EID + "." + EID);
                  message.channel.send("Emote reiniciado!");
                } else
                if(args[0] == ('platform')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setPlatform(args[1]);
                      message.channel.send("Plataforma alterada para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot platform <platform: WIN|MAC|AND|IOS|PSN|XBL|SWT>`);
                  }
                } else
                if(args[0] == ('input')){
                  if (args[1]){
                    try {
                      fortnite.party.me.setPlatform(args[1]);
                      message.channel.send("Entrada alterada para " + args[1]);
                    } catch {
                      message.channel.send("Syntax Inválida");
                    }
                  } else {
                    message.channel.send(`${message.author}\ns!bot input <input: MouseAndKeyboard|Controller|Touch>`);
                  }
                }
            })();
      }
        
    });

});

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
    if (command === "peixoto") {
        var peixoto = peixotos[Math.floor(Math.random() * peixotos.length)];
        if (args.length < 1){
            message.channel.send(`${message.author} aqui está o Peixoto:`, new discord.Attachment(peixoto, 'peixoto.png'));
        } else {
            let [user] = args;
            message.channel.send(`${message.author} mostrou o Peixoto para ${user}!`, new discord.Attachment(peixoto, 'peixoto.png'));
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
            message.channel.send(`${user} ${killmessage}`);
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
                args[1] = `pc`;
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
                args[2] = `global`;
                var gametype = `global`;
            }

            ftnstats.user(user, plataforma).then(data =>{
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
                
                var msg = "";
                msg += "\nPartidas Jogadas: " + matches;
                msg += "\nEliminações: " + kills;
                msg += "\nVitórias: " + wins;
                msg += "\nK/D: " + kd;

                var embed = new discord.RichEmbed()
                .setAuthor(data.username)
                .setDescription(msg)
                .setColor("#FF00FF")
                .setThumbnail("https://pbs.twimg.com/profile_images/1101123838589452299/rpu5UKTH.png");

                return message.channel.send(`${message.author} Mostrando estatística ${gametype} de ${data.username} na plataforma ${plataforma}`, embed);
            })
        }
    }
    
});

bot.login('NjIyMjA2MjI4MTgxMDI0NzY4.XXwhCA.NXQTqgjih4gt2lTQQw1zmmeOtDk');