const { EmbedBuilder } = require("discord.js")
const { BOT_CHANNEL } = require("../../../config.json");
const log = require("../../utils/log")

module.exports = {
    name: 'howgoodatlg',
    description: 'See how good you are at Lumber Games!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,
    // permissionsRequired: // EXSAMPLE: [PermissionFlagsBits.Administrator],
    // botPermissions: 
  
    callback: (client, interaction) => {
        try {
            if (!(interaction.channel.id == BOT_CHANNEL)) {
                interaction.reply("You cant send this here!")
            } else {
                let procent = Math.floor(Math.random() * 101);
                const embed = new EmbedBuilder()
                .setTitle("How good are you at lumber games?")
                .setColor("#2f7dde")
                .setDescription(`${interaction.user.tag}, you are to ${procent}% good at lumber games!`)
                interaction.reply({ embeds: [embed] })
            }
        } catch (error) {
            log(error)
            interaction.reply("There was an error!")
        }
  },
};