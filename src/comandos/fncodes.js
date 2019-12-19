const https = require('https')

module.exports.run = async (bot, message, args, prefix) => {
    if (args.length < 1){
        message.channel.send(`${message.author}\nVocê precisa especificar qual ou quais códigos deseja verificar!`);
        return;
    } else {
        if (args.length > 25) {
            message.channel.send(`${message.author}\nDesculpe, mas só posso verificar no máximo 25 códigos por vez!`);
            return;
        } else {
            message.channel.send(`${message.author}\nEstou verificando, por favor aguarde...`).then( m => {
            const codigos = args.join("%0D%0A").replace(",", "%0D%0A");
                https.get(`https://api.nitestats.com/v1/codes/checker?codes=${codigos}`, (res) => {
                    res.on('data', (data) => {
                        result = data.toString();
                        while (result.indexOf("<br>") > -1) {
                            result = result.replace("<br>", "\n");
                        }
                        m.edit(`${message.author} Verifiquei! Aqui está o resultado:\n${result}`);
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
