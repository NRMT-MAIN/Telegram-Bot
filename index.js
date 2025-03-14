const TelegramBot = require('node-telegram-bot-api') ; 

const token = '8126562032:AAEet4PCFfExxdWFVSRotNbniTWFesn6C6w' ;
const bot = new TelegramBot(token , {polling : true}) ;

bot.on('message' , (msg) => {
    const chatId = msg.chat.id ;
    const messageText = msg.text ;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }
}) ;