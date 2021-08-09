const disbut = require("discord-buttons");
const db = require('quick.db');
const {
 aqua,
 red,
 blue,
 purple,
 pink, 
 green,
 gray,
 white
} = require('../Server/color.json')
module.exports = {
    name: "ks",
    aliases:["unreg", "unregister", "kayıtsız", "kayıtsıfırla", "kayıt-sıfırla"],
    guildOnly: true, 
    async run(client, message, args, config, emoji, server, embed){
        if(![`${config.RegisterStaff}`].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(8)) return message.channel.send(embed(`
        Bu Komutu **\`YÖNETİCİ\`** İzni Olmayanlar Kullanamaz
        `)).then(x => x.delete({timeout: 5000})) 

       let iptal = new disbut.MessageButton()
       .setStyle('red')
       .setID(`iptal`)
       .setLabel('İptal')
       .setEmoji(`❌`)
       //
       let Onayla = new disbut.MessageButton()
       .setStyle('green')
       .setID(`Onayla`)
       .setLabel('Onayla')
       .setEmoji(`✅`)
       //
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let Taglı = member.user.username.includes("†")
        let Name = args[1]
        let Age = args[2]
        let MemberData = db.fetch(`${member.id}.Kayıt.${message.guild.id}`) || [];
        MemberData = MemberData.reverse();
        let Data = 
        MemberData.length > 0
        ? MemberData
        .map(
        (vaule, index) => 
        `\`${index+1}.\` **${vaule.İsim} | ${vaule.Yas}** (<@&${
            vaule.Rol
            }>)` 
            )
            .join("\n")
            : `${emoji.no} Bu Kullanıcı Hiç Bir Zaman Kayıt Olmamış!`;
            
         let Geçmiş = await db.fetch(`Kayıt.olma.${message.guild.id}.${member.id}`) || "0"
         let güvenli = Geçmiş >  4 
         if(!member) return message.channel.send(embed(`
         Lütfen Geçerli Bir **\`@kişi/ID\`** Belirtiniz
         `))
 
         if(!Name || !Age) return message.channel.send(embed(`
         Lütfen Geçerli Bir **\`İsim Yaş\`** Belirtiniz
         `))
 
         message.channel.send(embed(
             `**\`${member.user.username}\` kullanıcısın "\`${Taglı? `†` : `•`} ${Name} | ${Age}\`" ismini ve yaşını değiştirmeyi onaylıyormusunuz.\n\n${member.user.tag} Kullanıcısının Geçmiş İsimleri(${Geçmiş}) \`${güvenli ? "Güvensiz" : "Güvenli"}\`${güvenli ? `${config.no}` : `${config.yes}`}\n\n${Data}**`), {
                 buttons: [
                 iptal,
                 Onayla
                 ]
             })
             client.on('clickButton', async(button) => {
                 if(button.id === "iptal"){
                    if(button.clicker.id != message.author.id) return;
                    button.message.delete()
                    button.message.channel.send(embed(`
                    > Başarıyla isim değiştirme komutu durduruldu. ${emoji.yes}
                    `, `${aqua}`).setFooter(`cortex iptal functions successful`, `https://cdn.discordapp.com/emojis/868172837565906944.gif?v=1`))             
                 }
                 if(button.id == "onayla"){
                    if(button.clicker.id != message.author.id) return;
                    await member.setNickname(`${Taglı? `✮` : `•`} ${Name} | ${Age}`)
                 } 
             })
             
    }
}
