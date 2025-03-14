const FormData = require('form-data');
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
    const message = messageText.split(" ") ; 

    if (message[0] === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }
    else if(message[0] == '/joke') {
        const res = await getRandomJoke() ; 
        bot.sendMessage(chatId , res.joke) ; 
    }
    else if(message[0] == '/algorithm'){
        let photoPath = "" ;
        if(message[1] == "DP") photoPath = "./images/DP.webp"
        else if(message[1] == "Binary-Search") photoPath = "./images/binary-search.png" ;
        else if(message[1] == "Sorting") photoPath = "./images/Sorting.jpg" ;
        else{
            await bot.sendMessage(chatId ,  "Algorithm Available : DP Binary-Search Sorting " ) ;
            await bot.sendMessage(chatId , "/algorithm <Algorithm Name>")
            return ; 
        }
        try {
            await bot.sendPhoto(chatId , photoPath) ;
            console.log("Image sent Succesffull") ; 
        } catch(err){
            bot.sendMessage("Some Error Occur")
        }
    }
    else {
        bot.sendMessage(chatId , "Command Available : /start /algorithm /joke") ; 
    }
    
}) ;