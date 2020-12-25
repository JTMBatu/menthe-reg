const { dc, MessageEmbed } = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!['KULLANICAK ROL ID 1', 'KULLANICAK ROL ID 2'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

  
//KANALLAR VE ROLLER + TAG
let tag = "TAG"
const kayıtlı = message.guild.roles.cache.find(r => r.id === 'KADIN ROL ID')
const kayıtsız = message.guild.roles.cache.find(r => r.id === 'KAYITSIZ ROL ID')
const chat = message.guild.channels.cache.find(r => r.id === 'CHAT KANAL ID')
const kanal = message.guild.channels.cache.find(r => r.id === 'REGISTER CHAT KANAL ID')
const savelog = message.guild.channels.cache.find(r => r.id === 'GİZLİ LOG KANAL ID')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let devil = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')
  
  
//İSİM - ROL DEĞİŞME
devil.setNickname(`${tag} ${isim} | ${yas}`)  
devil.roles.add(kayıtlı)
devil.roles.remove(kayıtsız)

//DB LER
db.add(`yetkili.${message.author.id}.kadin`, 1)
db.add(`yetkili.${message.author.id}.toplam`, 1)
let kadın = db.get(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
     db.push(`isimler.${devil.id}`, {
    guildName: `${tag} ${isim} | ${yas}`,
    Name: isim,
    Age: yas,
    Zaman: Date.now(),
    Yetkili: message.author.id,
    Komut: "Kadın"
});
  
//CHAT EMBED
const chatembed = new MessageEmbed()
  .setColor("ffffff")
  .setDescription(`<@${devil.user.id}> Aramıza Hoşgeldin, Keyifli Vakitler Geçirmeni Dilerim.`)
chat.send(chatembed)
  
  
//REGİSTER CHAT EMBED
const embed = new MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`• Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`• Kayıt Edilen:`, `<@${devil.user.id}> Kayıt Oldu`)
    .addField(`• Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`• Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`• Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`• Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
  .setFooter(`Devil 🧡 Code`)
.setColor('PURPLE')
kanal.send(embed)
  
//SAVE LOG EMBED
const embed2 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .addField(`• Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
  .addField(`• Kayıt Edilen:`, `<@${devil.user.id}> Kayıt Oldu`)
  .addField(`• Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
  .addField(`• Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
  .addField(`• Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
  .addField(`• Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
  .setFooter(`Devil 🧡 Code`)
  .setColor('PURPLE')
savelog.send(embed)
  
  
//DM LOG EMBED
  const embed3 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .setDescription(`**${message.guild.name}** Sunucusunda, <@${message.author.id}> Tarafından Kaydedildin.
  İsmin **${tag} ${isim} | ${yas}** Olarak Değiştirildi.`)
  .setFooter(`Eğer Yanlışlık Varsa Yetkililere Bildir.`)
  .setColor('PURPLE')
member.send(embed3)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kadın", "k", "woman", "girl"],
    permLevel: 0
};

exports.help = {
    name: "kadın"
}

