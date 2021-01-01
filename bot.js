const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();


const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`Lordy House Sizinle`, { type:"WATHING" })
  
  console.log("Thealoq Efendim Hazir")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
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

//KOMUT ALGILAYICI SON

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


client.on('message', msg => {
    if (msg.content ===  'sea') {
      msg.reply('Aleyküm Selam!');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'bot') {
      msg.reply('Kardeşim Değilim Diyorum!');
    }
  });

  client.on('message', message => {
    if (message.content === 'Hadi') {
       return message.channel.send(exampleEmbed = new Discord.MessageEmbed().setColor('0x2F3236').setImage("https://media.giphy.com/media/l2Sqh2m6FZw0Fn9ew/giphy.gif") .setFooter('Thealoq :heart: NotGameBot').setDescription('Dostum Ozaman Bir Kart Seç Bakalim **Zaman** Mi ? **Para** Mi ?'));
      }
    });

  

  client.on('message', msg => {
    if (msg.content ===  'Zaman') {
      msg.reply('Önüde Harika Bir Günllerin Olucak Ama 2 Kişi Arasinda Kaliyorsun Öğrenmek İster Misin? Öğrenmek İçin **Seçim**');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'Seçim') {
      msg.reply('Geçmişte Yaşadiğin Sorunlar Çok Oldu Ama Şuan İyi Anlaştiğin Maggie Var Yada 1 Aydir Tandiğin Hiç Kavga Ettiğin Janifer Mi Seçmek İçin **Maggie** **Janifer**');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'Maggie') {
      msg.reply('Maggie İle Güzel Bir Hayat Yaşicaktin Fakat Aslinda Kanser Olduğunu Senden Gizledi Ve Sabahleyin Öldününü Fark Ediyorsun');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'Janifer') {
      msg.reply('3 Ay Beraber Eğlendiniz Ve Birbinize Uylumu Olduğunu Fark Ettiniz');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'Para') {
      msg.reply('Babandan Kalan Bir Miktar Para Bankada Fark Ediliyor Ve Sana Geçiyor Güzel Bir Yatirim Yapabilirsin Yada Güzel Günler GeçireBilirsin Seçimler İçin **GüzelGünler** **Yatirim**');
    }
  });
  
  
  
  client.on('message', msg => {
    if (msg.content ===  'Yatirim') {
      msg.reply('Yapirdiğin Şirket Dolandiriciymiş Bütün Paran Bitti Aç Kaldin');
    }
  });

  client.on('message', msg => {
    if (msg.content ===  'GüzelGünler') {
      msg.reply('Bir Adamla Taniştin Onunla Ortak İş Yaptin Ve Zengin Oldun');
    }
  });

  
client.login(ayarlar.token)