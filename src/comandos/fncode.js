const discord = require('discord.js');
const https = require('https');

module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar qual código deseja verificar!`);
        return;
    } else {
        if (args.length > 1) {
            message.channel.send(`${message.author}\nDesculpe, mas esse comando só funciona com um código por vez! Você pode usar \`${prefix}fncodes\` para verificar até um máximo de 25 códigos de uma vez!`);
            return;
        } else {
            message.channel.send(`${message.author}\nEstou verificando, por favor aguarde...`).then( m => {
                https.get(`https://api.nitestats.com/v1/codes/checker?format=json&&codes=${args[0]}`, (res) => {
                    res.on('data', (data) => {
                        result = JSON.parse(data.toString());
                        if (result.codes[0].status == "Invalid") {
                            var embed = new discord.RichEmbed()
                                .setAuthor("INFORMAÇÕES DO CÓDIGO:")
                                .setDescription(`**Código:** \`${result.codes[0].code}\`\n**Status:** ${result.codes[0].status}`)
                                .setColor("#25C059")
                        } else {
                            var embed = new discord.RichEmbed()
                                .setAuthor("INFORMAÇÕES DO CÓDIGO:")
                                .setDescription(`**Código:** \`${result.codes[0].code}\`\n**ID Interno:** ${result.codes[0].entitlementName}\n**Título:** ${result.codes[0].title}\n**Descrição:** ${result.codes[0].description}\n**Status:** ${result.codes[0].status}`)
                                .setColor("#25C059")
                        }
                        m.edit(`${message.author} Aqui está:`, embed);
                        return;
                    });
                }).on('error', (e) => {
                    console.error(e);
                    return;
                });
            });
        }
    }
}
