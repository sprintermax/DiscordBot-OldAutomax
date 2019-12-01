const oraculo = require("../oraculo.json");

const reyzi = oraculo.reyzi;
const jack = oraculo.jack;
const sprinter = oraculo.sprinter;
const accorsi = oraculo.accorsi;
const pole = oraculo.pole;
const santi = oraculo.santi;
const igoralcalde = oraculo.igoralcalde;
const kakaah = oraculo.kakaah;
const bauch = oraculo.bauch;
const aron = oraculo.aron;
const dark = oraculo.dark;
const hola = oraculo.hola;
const tande = oraculo.tande;
const hugz = oraculo.hugz;
const geral = oraculo.geral;

module.exports.run = async (bot, message, args, prefix) => {
  if (args.length < 1) {
    message.channel.send(`${message.author}\nVocê precisa mencionar alguem para eu dar a minha opinião!`);
  } else {
    const user = message.mentions.users.first();
    if (!user) {
      message.channel.send(`${message.author}\n"${args[0]}" é inválido. Você precisa mencionar algum usuário desse Servidor`);
    } else {
      const webhook = await message.channel.createWebhook("Oráculo", "https://media.discordapp.net/attachments/610290751624183809/650544030165368853/boladecristal.png").catch(error => console.log(error))
      message.delete();
      var opiniao = geral[Math.floor(Math.random() * geral.length)];
      if (user.id == "307331927772364801") {
        opiniao += `&&&${sprinter[Math.floor(Math.random() * sprinter.length)]}`;
      }
      if (user.id == "389520188166635524") {
        opiniao += `&&&${reyzi[Math.floor(Math.random() * reyzi.length)]}`;
      }
      if (user.id == "531542381888274432") {
        opiniao += `&&&${jack[Math.floor(Math.random() * jack.length)]}`;
      }
      if (user.id == "418591510817275904") {
        opiniao += `&&&${accorsi[Math.floor(Math.random() * accorsi.length)]}`;
      }
      if (user.id == "381823642285375492") {
        opiniao += `&&&${pole[Math.floor(Math.random() * pole.length)]}`;
      }
      if (user.id == "286983259093598208") {
        opiniao += `&&&${santi[Math.floor(Math.random() * santi.length)]}`;
      }
      if (user.id == "402575095614406656") {
        opiniao += `&&&${igoralcalde[Math.floor(Math.random() * igoralcalde.length)]}`;
      }
      if (user.id == "468780202625990687") {
        opiniao += `&&&${kakaah[Math.floor(Math.random() * kakaah.length)]}`;
      }
      if (user.id == "339230092599230464") {
        opiniao += `&&&${bauch[Math.floor(Math.random() * bauch.length)]}`;
      }
      if (user.id == "289575994526924821") {
        opiniao += `&&&${aron[Math.floor(Math.random() * aron.length)]}`;
      }
      if (user.id == "474232309315403776") {
        opiniao += `&&&${dark[Math.floor(Math.random() * dark.length)]}`;
      }
      if (user.id == "252120365348683776") {
        opiniao += `&&&${hola[Math.floor(Math.random() * hola.length)]}`;
      }
      if (user.id == "366401443680485376") {
        opiniao += `&&&${tande[Math.floor(Math.random() * tande.length)]}`;
      }
      if (user.id == "406196253484122133") {
        opiniao += `&&&${hugz[Math.floor(Math.random() * hugz.length)]}`;
      }

      opiniao = opiniao.trim().split("&&&");
      webhook.send(`${user} ${opiniao[Math.floor(Math.random() * opiniao.length)]}`);
      return webhook.delete();
    }
  }
}