const Discord = require('discord.js');  
module.exports = {
    name: "pp-cfg",
    aliases: ["pp-ayar", "pp-config"],
    async run(client, message, args, config, emoji, server, embed){
        if(message.author.id ==!config.DeveloperID || config.AdrianID) return message.channel.send(`**Bu komutu kullanabilmek için **\`Developer\`** Olmalısın**`) 
        let PP = args[0]
        if(!PP) return message.channel.send(embed('**Lütfen Geçerli Bir Profil Fotorafı Girin \`ÖRNEK:\`**').setImage(client.user.avatarURL({dynamic:true})))
        try{
            client.user.setAvatar(PP) 
            message.channel.send(embed(`**Botun Profil Fotorafı Başarıyla \`Değiştirildi\` ${config.yes}**`).setImage(PP))
        } catch(e){
            console.log(e)
            client.channels.cache.get(config.Error).send(new Discord.MessageEmbed()
        .setDescription(`${client.user.username} Botunuz \`\`\`${e}\`\`\` Sebepinden Arza Verdi`)
        .setColor('#2f3136')
        .setImage(`https://cdn.discordapp.com/attachments/853949430252306433/863793520434479124/png-clipart-computer-icons-error-closeup-miscellaneous-text.png`)
        .setTimestamp()
        .setFooter(`Cortex Err Solving`)
        )
    
        }
    }
}