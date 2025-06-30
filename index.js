const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is online'));
app.listen(3000, () => console.log('Web server started'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'SinhTon1215Neoforge.aternos.me',
    port: 54220,
    username: 'AFK_Bot123',
    version: '1.21'
  });

  bot.on('login', () => {
    console.log('✅ Bot đã vào server!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('⚠️ Bị kick, đang thử lại sau 10s');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => {
    console.log('❌ Lỗi:', err.message);
  });
}

createBot();
