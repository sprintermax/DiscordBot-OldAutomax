const discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
    var msg = '';
    msg += '\n\n**Comandos para Todos:**';
    msg += '\n\`hug <usuário>\`\n└Abraça o Usuário mencionado';
    msg += '\n\`peixoto <opcional:usuário>\`\n└Mostra uma imagem aleatória do Peixoto a você ou ao Usuário mencionado';
    msg += '\n\`kill <usuário>\`\n└Manda uma mensagem de morte do Minecraft para o Usuário mencionado';
    msg += '\n\`paraiso <opcional:usuário>\`\n└Envia o link de convite do servidor "Paraiso do Sprinter" para você ou para o Usuário mencionado';
    msg += '\n\`give <usuário> <item> <opcional:quantidade>\`\n└Dá um item simulando um comando do Minecraft para o Usuário mencionado';
    msg += '\n\`roll <opcional:quantidade>\`\n└Escolhe um número aleatório entre entre 1 até o valor escolhido (Padrão: 1 a 6)';
    msg += '\n\`fn <plataforma: PC|XBL|PSN> <modo:GLOBAL|SOLO|DUO|SQUAD> <nick>\`\n└Mostra as estatísticas do jogador mencionado no Fortnite Battle Royale';
    msg += '\n\n**Comandos Especiais:**';
    msg += '\n\`ping\`\n└Mostra a Latência do Bot e da API';
    msg += '\n\`say <texto>\`\n├Faz com que o Bot fale algo no chat\n└─Requer permissão: Gerenciar Mensagens';

    var embed = new discord.RichEmbed()
    .setDescription(msg)
    .setColor("#FF00FF")

    message.channel.send(`${message.author}\nMeu prefixo está configurado para **\`${prefix}\`**, aqui está uma lista dos meus comandos:`, embed);
}