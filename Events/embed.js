const  Discord = require('discord.js') 
module.exports = (des = "", col = "#2f3136") => {
    const embed = new Discord.MessageEmbed()
    .setDescription(des)
    .setColor(col)
    return embed
}
