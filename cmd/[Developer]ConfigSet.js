const db = require('quick.db');
module.exports = {
    name: "r-ayar",
    aliases: ["ayar"],
    async run(client, message, args, config, emoji, server, embed){
        if(message.author.id === config.DeveloperID) return;
        let Name = args[0]
        let Data = args[2]
        let Vuale = args[1]
        if(!Name) return message.channel.send(embed(`
        Lütfen değer giriniz
        `, `ORANGE`))
        if(!Vuale) return message.channel.send(embed(`
        Lütfen Veriyi Giriniz
        `, "RED"))
        if(args[0] == 'server'){
            server.yaz(`${Vuale}`, `${Data}`)
            message.channel.send(embed(`
            serverDB'ye ("${Vuale}") Verisi ("${Data}") Değerinde Kayıt Edildi!
            `, "GREEN"))
        }
        if(Name === 'server') return
        db.set(`${Name}`, `${Vuale}`)
        message.channel.send(embed(`
        serverDB'ye ("${Name}") Verisi ("${Vuale}") Değerinde Kayıt Edildi!
        `, "#ff0000"))
     
    }
}