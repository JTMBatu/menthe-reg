const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!['KULLANICAK ROL ID 1', 'KULLANICAK ROL ID 2'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

  
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setFooter("Devil ❤️ Menthe")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      let data = db.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((value, index) => `\`${index + 1}.\` ${value.guildName} ismiyle \`${new Date(value.Zaman).toTurkishFormatDate()}\` tarihinde ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : "Bulunamadı."} tarafından **${value.Komut}** olarak kaydedildi.`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`));

    
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["isimler", "names"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
}

