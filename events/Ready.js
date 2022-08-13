const Discord = require("discord.js");
const creza = require("../creza.json");
const client = global.client;

exports.execute = async () => {
    client.user.setPresence({ activity: { name: creza.Panels.Bio}, status: creza.Panels.Bio });
};

exports.conf = {
  event: "ready"
};