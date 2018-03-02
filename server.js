'use strict'

const request = require('request');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');

const city = 'Joinville';
const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.openWeatherToken}&units=metric`;

const bot = new TelegramBot(config.telegramToken, {polling: true});

bot.onText(/\/weather/, (msg) => {

    const chatId = msg.chat.id;

    request(openWeatherUrl, (err, res, body) => {

        console.log('oi')

        if(err) { return _error(bot, chatId); }

        const data = JSON.parse(body);

        if (!data.main) { return _error(bot, chatId); }

        const temp = data.main.temp;

        bot.sendMessage(chatId, `${temp}°`);
    });

});

bot.on('message', (msg) => {

    if (msg.text.includes('weather')) { return; }

    bot.sendMessage(msg.chat.id, `I'm alive!`);
});

const _error = (bot, chatId, msg) => bot.sendMessage(chatId, msg || 'Erroow.');