const Discord = require("discord.js");
const creza = require("./creza.json");
const _client = new Discord.Client({ fetchAllMembers: true });
const client = global.client = _client
const fs = require("fs");
client.cooldown = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Command] ${file.replace(".js", "")} Komut Yüklendi.`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
  })
});

fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")} Event Yüklendi.`);
});
  
client.login(creza.Panels.Token).then(c => console.log(`Başarıyla ${client.user.tag} Giriş yaptı!`)).catch(err => console.error(`Tokende bir hata var.`));


