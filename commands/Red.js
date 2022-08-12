const { MessageEmbed } = require("discord.js");
const creza = require("../creza.json");
const moment = require("moment");
require("moment-duration-format");

exports.execute = async (client, message, args) => {

    if(!message.member.roles.cache.has(creza.Roles.Staff)) if(message.author.id !== creza.Panels.Sahip) return message.react(creza.Emojis.Red)

    let embed = new MessageEmbed().setColor(creza.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter(client.users.cache.get(creza.Panels.Sahip).tag, client.users.cache.get(creza.Panels.Sahip).avatarURL({dynamic: true}))

    let User = message.guild.members.cache.get(args[0]);
    let Reason = args.splice(1).join(" ");

    moment.locale("tr");
    let time = moment(Date.now()).format("LLL");

    if(!User) return message.channel.send(embed.setDescription("Kullanıcı ID'sini Belirlemelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });
    if(!Reason) return message.channel.send(embed.setDescription("Bir sebep belirlemelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });

    client.channels.cache.get(creza.Channels.Red).send(`${creza.Emojis.Dnd} ${message.author}, ${User} Botunuz reddedildi sebebi: \`${Reason}\``)
    User.send(new MessageEmbed().setColor(creza.Panels.EmbedColor).setTimestamp().setFooter(`${message.author.tag} tarafından reddedildi.`, message.author.avatarURL({dynamic: true})).setTitle("Botunuz Onay Talebi Başarısız!").setDescription(`Merhaba, Yakın zamanda yapdığınız bot talebi reddedildi. Sebebi: \`${Reason}\``))

    let Red = new MessageEmbed().setColor(creza.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter("Bot Reddedildi!")
    .setDescription(`
• Botu Reddeden: ${message.author} - (\`${message.author.id}\`) 
• Botu Reddeilen: ${User} - (\`${User.id}\`)
• Botun Reddeilme Sebebi: \`${Reason}\`
• Reddeilme Tarihi: \`${time}\`
`)
    client.channels.cache.get(creza.Channels.Staff).send(Red).catch(e => { });

}
exports.conf = {
    command: "Red",
    description: "Creza Red",
    aliases: ["red"]
}