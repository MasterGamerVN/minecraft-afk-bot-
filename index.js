const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is online'));
app.listen(3000, () => console.log('🌐 Web server started"));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'tên-server.aternos.me', // Đổi thành tên server bạn
    port: PORT, // Đổi thành port server Aternos của bạn
    username: 'AFK_Bot123',
    version: '1.21' // ⚠️ KHÔNG phải 1.21.5, vì chưa được hỗ trợ
  });

  bot.on('login', () => {
    console.log('✅ Bot đã vào server!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 30000); // Nhảy nhẹ để tránh bị kick
  });

  bot.on('end', () => {
    console.log('⚠️ Mất kết nối, thử lại sau 10 giây...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('❌ Lỗi:', err.message);
  });
}

createBot();

