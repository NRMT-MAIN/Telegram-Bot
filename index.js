const TelegramBot = require('node-telegram-bot-api') ; 

const token = '8126562032:AAEet4PCFfExxdWFVSRotNbniTWFesn6C6w' ;
const bot = new TelegramBot(token , {polling : true}) ;

const getRandomJoke = async () => {
    try {
        const randomJoke = await fetch("https://icanhazdadjoke.com/" , {
            headers : {
                'accept' : 'application/json'
            }
        }) ;
        const data = await randomJoke.json() ; 
        return data ; 
    } catch(err){
         return {
            'joke' : "Sorry Some Error Occurs!"
         }
    }
}

bot.on('message' , async (msg) => {
    const chatId = msg.chat.id ;
    const messageText = msg.text ;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }

    if(messageText == '/joke') {
        const res = await getRandomJoke() ; 
        bot.sendMessage(chatId , res.joke) ; 
    }
}) ;