const { MessageEmbed, User } = require("discord.js");
const creza = require("../creza.json");
const moment = require("moment");
require("moment-duration-format");

exports.execute = async(client, message, args) => {

    if(message.channel.id !== creza.Channels.BotEkleme) return message.react(creza.Emojis.Red) && message.reply(`**Bu komutu sadece <#${creza.Channels.BotEkleme}> kullanabilirsin.**`).then(x => x.delete({timeout: 5000}))

    let embed = new MessageEmbed().setColor(creza.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter(client.users.cache.get(creza.Panels.Sahip).tag, client.users.cache.get(creza.Panels.Sahip).avatarURL({dynamic: true}))

    let BotID = args[0];
    let Prefix = args[1];

    moment.locale("tr")
    let time = moment(Date.now()).format("LLL")

    if(isNaN(BotID)) return message.channel.send(embed.setDescription("Botun ID'sini Belirlemelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });
    if(!Prefix) return message.channel.send(embed.setDescription("Botun Prefix'sini Belirlemelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });
   
    const filter = ["@everyone", "@here"];
    if(filter.some(word => message.content.includes(word))) return message.channel.send(embed.setDescription("Sadece ID ve Prefix belirte bilirsin!")).then(x => x.delete({timeout: 5000})).catch(e => { });

    client.channels.cache.get(creza.Channels.BotEkle).send(`${creza.Emojis.Idle} ${message.author}, Adlı kişi <@${BotID}> botunu sunucuya davet etmek istiyor onaylıyormusun?`).catch(e => { })
    message.author.send(new MessageEmbed().setColor(creza.Panels.EmbedColor).setFooter("Yakında Onaylanıcaktır!", message.author.avatarURL({dynamic: true})).setTitle("Bot Ekleme Talebi Başrılı!").setDescription(`${creza.Emojis.Invisible} Merhaba, <@${BotID}>, Adlı botunuzun talebi alındı. Lütfen onaylanmasını bekleyin!`)).catch(e => { })

    let PremLog = new MessageEmbed().setColor(creza.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter(`Bot Ekleme Onaylanmayı Bekliyor!`)
    .setDescription(`
• Botu Davet Eden: ${message.author} - (\`${message.author.id}\`)
• Davet Edilen: <@${BotID}> - (\`${BotID}\`)
• Bot Ekletme Tarihi: \`${time}\`

[0 Perm](https://discord.com/oauth2/authorize?client_id=${BotID}&scope=bot&permissions=0) | [8 Perm](https://discord.com/oauth2/authorize?client_id=${BotID}&scope=bot&permissions=8) Bot Davet Linkleri!`)
client.channels.cache.get( creza.Channels.Staff ).send(`<@&${creza.Roles.Staff}>`, PremLog ).catch(e => { });

message.react(creza.Emojis.Onay)
message.delete({timeout: 10000}); message.reply("Talep Alındı. Mesajın 10 saniye içerisinde silincekdir.").then(x => x.delete({timeout: 10000}));

};
exports.conf = {
    command: "BotEkle",
    description: "Creza BotEkleme ",
    aliases: ["botekle"]
}