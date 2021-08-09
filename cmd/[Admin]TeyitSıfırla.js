const db = require('quick.db');
module.exports = {
    name: "teyit",
    aliases:["s"],
    cooldown: 4,
    async run(client, message, args, config, emoji, server, embed){
        if(![`${config.RegisterStaff}`].some(role => message.member.roles.cache.get(role))) return;     
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        let kayıtlar = await db.fetch(`teyitler.${message.guild.id}.${member.id}`)
        if(!args[0] == "sıfırla" && "info") return message.channel.send(embed(`
        Bu komutu kullanabilmek için \`sıfırla/info @ID\` yazmalısnız 
        `).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})))
        
        if(args[0] == "sıfırla"){
            if(!kayıtlar) return message.channel.send(`**Bu kullanıcı hiç bir insanı kayıt etmemiş.**`)
            message.channel.send(`
            **${member.user.username}(${member.id}) Kullanıcısının \`${kayıtlar}\` teyitleri başarıyla silindi.**
            `)    
            await db.delete(`teyitler.${message.guild.id}.${member.id}`)

        }
        if(args[0] == "info"){
            if(!kayıtlar) return message.channel.send(`**\`${member.tag}\` Bu kullanıcı hiç bir insanı kayıt etmemiş.**`)
            message.channel.send(`
            > **${member}(\`${member.id}\`) Kullanıcısının \`${kayıtlar}\` toplam teyiti.**
            `)    
        }
        
   
    }
}