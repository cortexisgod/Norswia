const db = require('quick.db');
const disbut = require('discord-buttons');

module.exports = {
    name: "kayıt",
    aliases: ["e", "k", "erkek", "kadın", "kız", "man", "woman"],
    async run(client, message, args, config, emoji, server, embed){
        if(![`${config.RegisterStaff}`].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(8)) return message.channel.send(embed(`
        Bu Komutu **\`YÖNETİCİ\`** İzni Olmayanlar Kullanamaz
        `)).then(x => x.delete({timeout: 5000})) 
         //Buttonları Tanımlıyoruz 
        let erkek = new disbut.MessageButton()
        .setID('erkek')
        .setLabel('Erkek')
        .setEmoji('868172411202310175')
        .setStyle('blurple');
        //Kız Button
        let kız = new disbut.MessageButton()
        .setID('kız')
        .setLabel('Kız')
        .setEmoji('868172411202310175')
        .setStyle('red') 
        let iptal = new disbut.MessageButton()
        .setID('İptal')
        .setLabel('iptal')
        .setEmoji('868172411202310175')
        .setStyle('red') 
        // Kullanıcı Tanımlıyoruz
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let Name = args[1]
        let Age = args[2]
        let erkekRol = await db.fetch(`erkek`)
        let kızRol = await db.fetch(`kız`)
        //Taglı Alım
             
        if(!erkekRol) return message.channel.send(embed(`
        Erkek Rol Ayarlanmamış \`${config.settings.prefix}r-ayar erkek @rol/ID\` yazarak ayarlayabilirsiniz
        `).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})))
        if(!kızRol) return message.channel.send(embed(`
        Erkek Rol Ayarlanmamış \`${config.settings.prefix}r-ayar kız @rol/ID\` yazarak ayarlayabilirsiniz
        `).setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true})))
       /**
        * @kişi/ID Tanımlıyoruz
        */
        if(!member) return message.channel.send(embed(`
        Lütfen Geçerli Bir **\`@kişi/ID\`** Belirtiniz
        `))
          //
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
   //

        if(!Name || !Age) return message.channel.send(embed(`
        Lütfen Geçerli Bir **\`İsim Yaş\`** Belirtiniz
        `))

        message.channel.send(embed(
            `Erkek İse "**Erkek**" Buttonuna Kız ise "**Kız**" Buttonuna Basınız\n\n**  ${member.user.tag} Kullanıcısının Geçmiş İsimleri(${Geçmiş}) \`${güvenli ? "Güvensiz" : "Güvenli"}\`${güvenli ? `${config.no}` : `${config.yes}`}\n\n${Data}**`), {
                buttons: [
                    erkek,
                    kız
                ]
            })
            client.on('clickButton', async (button) => {
                    if(button.id === 'erkek'){
                        if(button.clicker.id != message.author.id) return
                        await button.message.delete()
                        let Taglı = member.user.username.includes("†")
                        const roller = await db.fetch(`erkek`)
                        member.roles.add(roller)
                        member.setNickname(`${Taglı? `✮` : `•`} ${Name} | ${Age}`)
                        message.channel.send(embed(`
                         ${member} kullanıcısı "\`${Taglı? `✮†` : `•`} ${Name} | ${Age}\`" ismiyle kaydı tamamlandı(<@&${erkekRol}>) 
                        `))
                        db.add(`teyitler.${message.guild.id}.${message.author.id}`, `1`)
                        db.add(`Kayıt.olma.${message.guild.id}.${member.id}`, `1`)
                        db.push((`${member.id}.Kayıt.${message.guild.id}`), {
                            Rol: roller,
                            İsim: Name,
                            Yas: Age
                        })
                        if(Taglı) return member.roles.add(config.TaggesRoles)

                }
                if(button.id === 'kız'){
                    if(button.clicker.id != message.author.id) return
                    button.message.delete()
                    let Taglı = member.user.username.includes("†")
                    const roller = await db.fetch(`kız`)
                    member.roles.add(roller)
                    member.setNickname(`${Taglı? `✮` : `•`} ${Name} | ${Age}`)
                    message.channel.send(embed(`
                     ${member} kullanıcısı "\`${Taglı? `✮` : `•`} ${Name} | ${Age}\`" ismiyle kaydı tamamlandı(<@&${kızRol}>) 
                    `).setAuthor(`${member.displayName} (${member.id})`, message.author.avatarURL({dynamic: true})))
                    db.add(`teyitler.${message.guild.id}.${message.author.id}`, `1`)
                    db.add(`Kayıt.olma.${message.guild.id}.${member.id}`, `1`)
                    db.push((`${member.id}.Kayıt.${message.guild.id}`), {
                        Rol: roller,
                        İsim: Name,
                        Yas: Age
                    })
                    if(Taglı) return member.roles.add(config.TaggesRoles)
                }
            })
    }
}