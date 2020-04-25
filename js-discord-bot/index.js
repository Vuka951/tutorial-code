const Discord = require('discord.js');
const client = new Discord.Client();
const ytsr = require('ytsr');

// Config imports
const {
    token,
    prefix,
} = require('./config.json');

// Gets triggered when the client becomes ready to start working
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


// Gets triggered whenever a message is sent/created on any text channel taht the bot is in
client.on('message', async (msg) => {

    // Checks if the msg is sent by a bot
    if(msg.author.bot) return;

    // Checks if the msg starts with the predefined prefix
    if(!msg.content.startsWith(prefix)) return;

    /* 
        Removes the first char(prefix "!" in this case) and then split the rest of the msg into:
        the command and the rest
    */
    const [command, ...args] = msg.content.substring(1).split(' ');

    // Checks if the command is search
    if(command === 'search') {
        // joins the array of args into a single string
        const whatToSearch = args.join(' ');
        // Makes an api call to yt and searches for w/e and returns the first 5 results
        const results = await ytsr(whatToSearch, {limit: 5});
        const firstResult = {title: results.items[0].title, link: results.items[0].link};
        // Replys to in the channel the msg was sent with the info
        msg.reply(`The First YT Search Result for ${whatToSearch} is: ${firstResult.title} and it can be found at ${firstResult.link}`);
    }
});

client.login(token);