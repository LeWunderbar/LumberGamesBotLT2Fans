const { interaction, Client, IntentsBitField, EmbedBuilder, Guild, ApplicationCommandOptionType } = require("discord.js")
const { HOST_CHANNEL, HOST_PINGROLE_ID, HOST_PERMROLE } = require("../../../config.json");
const log = require("../../utils/log")
const getEntrys = require("../../utils/roblox/getEntry")
const getUserId = require("../../utils/roblox/getUserIdFromUsername")

function getDataByKey(data, key) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === key) {
            let string = null
            let ValueData = data[i][1];
            if (typeof ValueData == "number") {
                string = ValueData.toString()
            } else if (typeof ValueData == "boolean") {
                if (ValueData) {
                    string = "On"
                } else {
                    string = "Off"
                }
            }
            return string
        }
    }
    return null
}

module.exports = {
    name: 'stats',
    description: 'Get stats of a roblox player!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: "robloxuser",
            description: "Username of the person you want to see the stats off",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    // deleted: Boolean,
    // permissionsRequired: // EXSAMPLE: [PermissionFlagsBits.Administrator],
    // botPermissions: 
    callback: async (client, interaction) => {
        try {
            const Username = interaction.options.get("robloxuser").value
            const UserId = await getUserId(Username)
            
            if (UserId == undefined) {
                interaction.reply({
                    content: 'Cannot find UserId of provided username! Is the username Valid?',
                    ephemeral: true
                });
            } else {
                const UserData = await getEntrys("DataV4", UserId); 
                if (UserData == undefined) {
                    interaction.reply({
                        content: 'This user has no data within Lumber Games!',
                        ephemeral: true
                    });
                } else { 
                    const embed = new EmbedBuilder()
                    .setTitle(`Lumber Games Stats of ${Username} (${UserId})`)
                    .setColor("#2f7dde")
                    .setThumbnail("https://cdn.discordapp.com/attachments/844638877923016714/1005925239919751338/unknown.png")
                    .setTimestamp()
                    .addFields(
                        { name: "**Money**", value: getDataByKey(UserData, "Money"), inline: true },
                        { name: "**Wins**", value: getDataByKey(UserData, "Wins"), inline: true },
                        { name: "**Oof's**", value: getDataByKey(UserData, "Oof's"), inline: true },
                        { name: "**XP**", value: getDataByKey(UserData, "Experience"), inline: true },
                        { name: "**Level**", value: getDataByKey(UserData, "Level"), inline: true },
                        { name: "**Eliminations**", value: getDataByKey(UserData, "Eliminations"), inline: true },
                        { name: "**Sponsors**", value: getDataByKey(UserData, "Sponsors"), inline: true },
                        { name: "**Health Regen**", value: getDataByKey(UserData, "HealthRegenPerk"), inline: true },

                    )
                    interaction.reply({ content: `Requested User Data:`, embeds: [embed] });
                }
            }
        } catch (error) {
            log(error);
            interaction.reply({
                content: 'There was an error! It has been logged. Please DM M23__ and notify them of the issue!',
                ephemeral: true
            });
        }
    },
};