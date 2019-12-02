const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    var msg = '';
    msg += '\n\n**Comandos Gerais:**';
    msg += '\n\`hug <usuário>\`\n└Abraça o Usuário mencionado';
    msg += '\n\`avatar <usuário>\`\n└Faz com que o Bot envie a imagem de perfil do Usuário mencionado';
    msg += '\n\`peixoto <opcional:usuário>\`\n└Mostra uma imagem aleatória do Peixoto a você ou ao Usuário mencionado';
    msg += '\n\`kill <usuário>\`\n└Manda uma mensagem de morte do Minecraft para o Usuário mencionado';
    msg += '\n\`give <usuário> <item> <opcional:quantidade>\`\n└Dá um item simulando um comando do Minecraft para o Usuário mencionado';
    msg += '\n\`roll <opcional:quantidade>\`\n└Escolhe um número aleatório entre entre 1 até o valor escolhido (Padrão: 1 a 6)';
    msg += '\n\`say <opcional:chat> <conteúdo:mensagem|imagem>\`\n└Faz com que o Bot fale algo no chat como se fosse você';
    msg += '\n\`oraculo <usuário>\`\n└Faz com que o Bot fale algo sobre o Usuário mencionado';
    msg += '\n\`fn <plataforma: PC|XBL|PSN> <modo:GLOBAL|SOLO|DUO|SQUAD> <nick>\`\n└Mostra as estatísticas do jogador mencionado no Fortnite Battle Royale';
    msg += '\n\n**Comandos Especiais:**';
    msg += '\n\`ping\`\n└Mostra a Latência do Bot e da API';
    msg += '\n\`sendembed <opcional:chat> <conteúdo:mensagem|imagem>\`\n└Faz o bot mandar uma mensagem com conteúdo embed no chat atual ou mencionado';
    msg += '\n\`editembed <opcional:chat> <conteúdo:mensagem|imagem>\`\n└Faz o bot editar o conteúdo embed de uma mensagem no chat atual ou mencionado\n└─Requer permissão: Gerenciar Mensagens';
    msg += '\n\`editmsg <opcional:chat> <conteúdo:mensagem|imagem>\`\n└Faz o bot editar o conteúdo de uma mensagem no chat atual ou mencionado\n└─Requer permissão: Gerenciar Mensagens';
    msg += '\n\`staffembed <opcional:chat> <conteúdo:mensagem|imagem>\`\n└Faz o bot mandar uma mensagem marcando everyone com conteúdo embed no chat atual ou mencionado\n└─Requer permissões: Gerenciar Servidor | Mencionar Everyone';
    msg += '\n\`sayas <usuário> <opcional:chat> <conteúdo:mensagem|imagem>\`\n├Faz com que o Bot fale algo no chat como se fosse o usuário mencionado\n└─Requer permissão: Gerenciar Mensagens';
    msg += '\n\`botsay <opcional:chat> <conteúdo:mensagem|imagem>\`\n├Faz com que o Bot fale algo no chat como ele mesmo\n└─Requer permissão: Gerenciar Mensagens';
    //msg += '\n\n**Observações:**';
    //msg += '\n-Comandos com envio de imagens anexadas só são possíveis caso for enviar a mensagem em OUTRO chat, pois a mensagem original do comando NÃO deve ser deletada, caso isso ocorra, a imagem na mensagem do bot irá sumir também';

    var embed = new discord.RichEmbed()
    .setDescription(msg)
    .setColor("#25C059")

    message.author.send(`Meu prefixo no servidor **${message.guild.name}** está configurado para **\`${prefix}\`**, aqui está uma lista dos meus comandos:`, embed)
    .then(() => {
        message.channel.send(`${message.author}\nEnviei! Dê uma olhada nas suas Mensagens Privadas`);
    })
    .catch(() => {
        message.channel.send(`${message.author}\nNão consigo enviar mensagens no seu privado, verifique se suas configurações de privacidade estão bloqueando isso.`)
        return;
    });
}