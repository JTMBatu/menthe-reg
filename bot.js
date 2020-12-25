const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG
client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "REGISTER CHAT KANAL ID");
    const register = "<@&REGISTER ROL ID>"
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': ``,
            '1': ``,
            '2': ``,
            '3': ``,
            '4': ``,
            '5': ``,
            '6': ``,
            '7': ``,
            '8': ``,
            '9': ``}[d];
          })
        }
  
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil <a:wrong:764161535055626292>'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir <a:true:764161534808817724>'
    moment.locale("tr");
      const embed = new Discord.MessageEmbed()
      .setAuthor(member.guild.name)
      .setColor("RANDOM")
  .setDescription("**<a:pikachu:764509686585098241> • Hoşgeldin! <@" + member + "> Seninle " + üyesayısı + " Kişiyiz.\n\n<a:purplediamond:764161511647215633> • Soldaki Odalardan Birine Geçip Kayıt Olabilirsin.\n\n<a:kilit:764161526071427122> • Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n<a:dikkat:764161510787907635> • "  + kontrol + "\n\n<a:hac1:764161516362268674> • Tagımızı alarak ` ᛉ ` bize destek olabilirsin.**")
   .setImage("https://images-ext-2.discordapp.net/external/GFDzmFva48_HXuap5Yjvt_laIzmYBZI2Eqw1WRdHnZU/https/i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif")
   kanal.send(register)   
    kanal.send(embed) 
});
  

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG



//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'TAG'
  const sunucu = 'SUNUCU ID'
  const kanal = 'KANAL ID'
  const rol = 'ROL ID'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});


//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get(''); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = ""; // Buraya Ekip Tag
  var tagrol = ""; // Buraya Ekip Rolünün ID
  var kanal = ""; // Loglanacağı Kanalın ID

  if (!sunucu.members.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.filter(rol => rol.position >= sunucu.roles.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch(err) { console.error(err) };
  };
});
//-----------------------OTO-TAG-----------------------\\ 

client.on("guildMemberAdd", async (member) => {
member.roles.add(ayarlar.kayitsiz)
})

client.on("guildMemberAdd", async (member) => {
member.roles.add(ayarlar.isimsiz)
})