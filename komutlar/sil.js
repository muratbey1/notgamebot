const Discord = require('discord.js');
exports.run = function(client, message, args) {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Bunun için gerekli iznin yok');
  if (!message.guild) {
    return message.author.send('`temizle` komutu sadece sunucularda kullanılabilir.');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send('Kaç mesaj silmem gerektiğini belirtmedin.')
  if (mesajsayisi > 100) return message.channel.send('100 den fazla mesaj silemem!');
  message.channel.bulkDelete(mesajsayisi + 1);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle'],
  permLevel: 3
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
