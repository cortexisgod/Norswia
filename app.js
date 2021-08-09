//Discord Tanımlama
const Discord = require('discord.js');
//Client 
const client = new Discord.Client();
//Buttons 
const disbut = require('discord-buttons');
disbut(client);
//DataBase 
const db = require('quick.db');
//Server 
const server = require('./Server/helper')
const config = require('./serverDB.json');
//Emoji 
const emoji = require('./serverDB.json');
//Moment 
const moment = require('moment');
//FS
const fs = require('fs');
//Prefix
var prefix = config.settings.prefix

//Collection

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFile =  fs.readdirSync("./cmd/").filter(file => file.endsWith(".js"));

commandFile.forEach(file => {
    const command = require(`./cmd/${file}`)
    client.commands.set(command.name, command);
    console.log(`[BOT] ${command.name}`)
})
//Events
const embed = require('./Events/embed');
const guildMemberAdd = require('./Events/guildMemberAdd')
//Events Loader
client.on('ready', async () => {
    client.user.setPresence({ activity: {   
        name: "Cortex 🖤 Ashriel" ,type: "PLAYING"}, status: "idle"})
        guildMemberAdd(client, emoji)
        embed()
})
client.on('message', async(message) => {
    if (message.author.bot) return;
    const embed = new Discord.MessageEmbed()
   .setTimestamp()
   .setDescription()
   .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
   .setColor(message.member.displayHexColor)
   .setFooter(client.users.cache.get("851882528101236826").username, client.users.cache.get("851882528101236826").avatarURL({dynamic: true}));

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!message.content.startsWith(prefix) || !command) return;
    // Guild Control
    if (command.guildOnly && message.channel.type == "dm")
        return message.channel.send(
           "Bu Komut Yalnızca Sunucularda Kullanılabilir!"
        );
    // Dev Control
    if (command.developerOnly && message.author.id != config.DeveloperID)
    return message.channel.send(
       `Bunu Sadece Geliştiriciler Kullanabilir.`
    );

    // Cool Down
    if (!cooldowns.has(commandName)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamp = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamp.has(message.author.id)) {
        const expirationTime =
            timestamp.get(message.author.id) + cooldownAmount;
        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel
                .send(`Bu Komutu Tekrar Kullanabilmek İçin **${parseInt(timeLeft)}** Saniye Bekleyin!`)
                .then((x) => x.delete({ timeout: 5000 }));
        }
    }

    timestamp.set(message.author.id, now);
    setTimeout(() => {
        timestamp.delete(message.author.id);
    }, cooldownAmount);


    try {
        command.run(client, message, args, config, emoji, server, embed);
    } catch (e) {
       client.channels.cache.get("867741577380495381").send(new Discord.MessageEmbed()
        .setDescription(`${client.user.username} Botunuz \`\`\`${e}\`\`\` Sebepinden Arza Verdi`)
        .setColor('#2f3136')
        .setImage(`https://cdn.discordapp.com/attachments/853949430252306433/863793520434479124/png-clipart-computer-icons-error-closeup-miscellaneous-text.png`)
        .setTimestamp()
        .setFooter(`Cortex Err Solving`)
        )
        console.log(e);
    }
});

client.login("TOKEn")
/**
 * ? token: 
 * Profiles => 
 * Functions: Register 
 * Bot's
 * Kayıt 
 */
