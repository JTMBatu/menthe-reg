const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!['KULLANICAK ROL ID 1', 'KULLANICAK ROL ID 2'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

let tag = "ᛉ";
let cetoplam = message.guild.memberCount
let ceonline = message.guild.members.cache.filter(o => o.user.presence.status !== "offline").size
let cesesli = message.guild.members.cache.filter(s => s.voiceChannel).size 
let cetagli = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size
let cebooster = message.guild.roles.cache.get('BOOSTER ROL ID').members.size

  const mapping = {
  "0": "",
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",  //EMOJİLERİNİZ
  "6": "",
  "7": "",
  "8": "",
  "9": "",
};



let toplam =  
    `${cetoplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let online =  
    `${ceonline}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")

let sesli =  
    `${cesesli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let tagli =  
    `${cetagli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let booster =  
    `${cebooster}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")

//------------------------------------STRIGA--CODE-----------------------------------\\

const embed2 = new MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**• Toplam Üye ・ ${toplam}
• Aktif Üye ・ ${online}
• Sesteki Üye ・ ${sesli}
• Taglı Üye ・ ${tagli}
• Booster Üye ・ ${booster}**`)
.setFooter("Devil 💚 Code")
message.channel.send(embed2)

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["say", "sunucusay"],
    permLevel: 0
};

exports.help = {
    name: "say"
}