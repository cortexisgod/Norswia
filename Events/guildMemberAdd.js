const db = require('quick.db');
const Discord = require('discord.js');
const moment = require('moment')
//

module.exports = (client, emoji) => {
    client.on('guildMemberAdd', async(member) => {
        let RegChannel = await db.get(`${member.guild.id}.${member.guild.name}.regchannels`)
        if(!RegChannel) return;
        moment.locale("tr")
        RegChannel.send(`
        ${emoji.nosiwayıldız} **${member.guild.name}'e** Hoşgeldin ${member}-(\`${member.id}\`)\n\n${emoji.nosiwayıldız} Seninle birlikte **${member.guild.memberCount}** üyeye ulaştık.\n\n${emoji.nosiwayıldız} Hesabın **\`${moment(member.user.createdAt).format('LL')} ${moment(member.user.createdAt).format('LT')}\`** (${moment(member.user.createdAt).fromNow()}) oluşturulmuş\n\n\`\`\`#rules kanalındaki kuralları ve discordun genel kurallarını https://discord.com/guidelines okumayı ve uymayı unutma iyi eğlenceler\`\`\`
        `)
    })
}
