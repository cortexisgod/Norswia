module.exports = {
    name: "reboot",
    aliases: ["res"],
    async run(client, message, args){
        if(message.author.id === config.DeveloperID) return;
        message.channel.send("> Bot yeniden başlatılıyor..").then(msg => {
            console.log("[BOT]Yeniden başlatılıyor | [Cortex]");
            process.exit(0);    
        });
    }
}