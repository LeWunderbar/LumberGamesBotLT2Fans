//////////////////////////
// Imports of Index.js //
/////////////////////////

const { Client, IntentsBitField } = require('discord.js');
// const mongoose = require("mongoose")
const eventHandler = require('./handlers/eventHandler');
const log = require("./utils/log")
require("dotenv").config()

///////////////////////////
// Configs of the client //
///////////////////////////

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


////////////////
// Launch Bot //
////////////////

console.clear();
console.log(`
    ██╗      ██████╗ ██╗   ██╗    ███╗   ███╗██████╗ ██████╗
    ╚██╗     ██╔══██╗╚██╗ ██╔╝    ████╗ ████║╚════██╗╚════██╗
     ╚██╗    ██████╔╝ ╚████╔╝     ██╔████╔██║ █████╔╝ █████╔╝
     ██╔╝    ██╔══██╗  ╚██╔╝      ██║╚██╔╝██║██╔═══╝  ╚═══██╗
    ██╔╝     ██████╔╝   ██║       ██║ ╚═╝ ██║███████╗██████╔╝
    ╚═╝      ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚══════╝╚═════╝                                                
`);

(async () => {
  try {
    // // MongoDB Setup
    // mongoose.set("strictQuery", false)
    // await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
    // log("Connected to MongoDB")
    // Bot Setup
    eventHandler(client);
    client.login(process.env.TOKEN);
  } catch (error) {
    log(`There was an error! \n \n ${error}`)
  }
})();
