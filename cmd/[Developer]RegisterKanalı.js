const db = require('quick.db')
module.exports = {
    name: "r-channel",
    async run(client, message, args, config, emoji, server, embed){
        if(message.author.id === config.DeveloperID) return;
        let channel = message.mentions.channels.first()|| message.guild.channels.cache.get(args[0]) 
        db.set(`${message.guild.id}.${message.guild.name}.regchannels`, `${channel.id}`)
        console.log('DB işlemi başarılı')
    }
}