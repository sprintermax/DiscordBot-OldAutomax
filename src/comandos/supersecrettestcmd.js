const discord = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports.run = async (bot, message, args, prefix) => {
    var htmlpage = fs.readFileSync('./src/assets/StorePage.html', 'utf8');  
    var date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    pagecontent = htmlpage.toString();
    pagecontent = pagecontent.replace("currentdate", `${day}/${month}/${year}`)
    await page.setContent(pagecontent);
    message.channel.send(`${message.author} Aqui está:`, new discord.Attachment(await page.screenshot(), 'loja.png'));
    await browser.close()
    
}