const { interaction, Client, IntentsBitField, EmbedBuilder, Guild, ApplicationCommandOptionType } = require("discord.js")
const { HOST_CHANNEL, HOST_PINGROLE_ID, HOST_PERMROLE } = require("../../../config.json");
const log = require("../../utils/log")
const getOrderedDatastoreEntry = require("../../utils/roblox/getOrderedDatastoreEntry")
const getUsernameFromUserid = require("../../utils/roblox/getUsernameFromUserId")

module.exports = {
    name: 'leaderboard',
    description: 'Get the LG Leaderboard!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: "leaderboard",
            description: "select the leaderboard you want to see!",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Eliminations',
                    value: 'Eliminations1'
                },
                {
                    name: 'Oofs',
                    value: 'Oofs1'
                },
                {
                    name: 'Levels',
                    value: 'Level1'
                },
                {
                    name: 'Wins',
                    value: 'Win1'
                },
                {
                    name: 'Sponsors',
                    value: 'Sponsor1'
                },
            ]
        },
    ],
    // deleted: Boolean,
    // permissionsRequired: // EXSAMPLE: [PermissionFlagsBits.Administrator],
    // botPermissions: 
    callback: async (client, interaction) => {
        try {
            const leaderboardOption = interaction.options.get("leaderboard").value
            let leaderboardOptionName = "N/A"
            let NumberName = "N/A"

            if (leaderboardOption == "Eliminations1") {
                leaderboardOptionName = "Top Eliminations"
                NumberName = "Eliminations"
            } else if (leaderboardOption == "Oofs1") {
                leaderboardOptionName = "Top Oofs"
                NumberName = "Oofs"
            } else if (leaderboardOption == "Level1") {
                leaderboardOptionName = "Top Levels"
                NumberName = "Level"
            } else if (leaderboardOption == "Win1") {
                leaderboardOptionName = "Top Wins"
                NumberName = "Wins"
            } else if (leaderboardOption == "Sponsor1") {
                leaderboardOptionName = "Top Sponsors"
                NumberName = "Sponsors"
            }
            
            const leaderboardDataRaw = await getOrderedDatastoreEntry(leaderboardOption, "global", "desc", 10)
            const leaderboardData = {};
            await Promise.all(leaderboardDataRaw.entries.map(async (entry, index) => {
                const userid = entry.id;
                const username = await getUsernameFromUserid(userid);
                const value = entry.value;

                leaderboardData[index + 1] = [{
                    username,
                    userid,
                    value
                }];
            }));

            const embed = new EmbedBuilder()
                .setTitle(`Leaderboard: ${leaderboardOptionName}`)
                .setColor("#2f7dde")
                //.setThumbnail("https://cdn.discordapp.com/attachments/844638877923016714/1005925239919751338/unknown.png")
                .setTimestamp()
                .addFields(
                    { name: "1", value: `**Username:** ${leaderboardData[1][0].username}\n**UserId:** ${leaderboardData[1][0].userid}\n**${NumberName}:** ${leaderboardData[1][0].value}`, inline: true },
                    { name: "2", value: `**Username:** ${leaderboardData[2][0].username}\n**UserId:** ${leaderboardData[2][0].userid}\n**${NumberName}:** ${leaderboardData[2][0].value}`, inline: true },
                    { name: "3", value: `**Username:** ${leaderboardData[3][0].username}\n**UserId:** ${leaderboardData[3][0].userid}\n**${NumberName}:** ${leaderboardData[3][0].value}`, inline: true },
                    { name: "4", value: `**Username:** ${leaderboardData[4][0].username}\n**UserId:** ${leaderboardData[4][0].userid}\n**${NumberName}:** ${leaderboardData[4][0].value}`, inline: true },
                    { name: "5", value: `**Username:** ${leaderboardData[5][0].username}\n**UserId:** ${leaderboardData[5][0].userid}\n**${NumberName}:** ${leaderboardData[5][0].value}`, inline: true },
                    { name: "6", value: `**Username:** ${leaderboardData[6][0].username}\n**UserId:** ${leaderboardData[6][0].userid}\n**${NumberName}:** ${leaderboardData[6][0].value}`, inline: true },
                    { name: "7", value: `**Username:** ${leaderboardData[7][0].username}\n**UserId:** ${leaderboardData[7][0].userid}\n**${NumberName}:** ${leaderboardData[7][0].value}`, inline: true },
                    { name: "8", value: `**Username:** ${leaderboardData[8][0].username}\n**UserId:** ${leaderboardData[8][0].userid}\n**${NumberName}:** ${leaderboardData[8][0].value}`, inline: true },
                    { name: "9", value: `**Username:** ${leaderboardData[9][0].username}\n**UserId:** ${leaderboardData[9][0].userid}\n**${NumberName}:** ${leaderboardData[9][0].value}`, inline: true },
                    { name: "10", value: `**Username:** ${leaderboardData[10][0].username}\n**UserId:** ${leaderboardData[10][0].userid}\n**${NumberName}:** ${leaderboardData[10][0].value}`, inline: true }
                )
            interaction.reply({ content: `Requested Leaderboard:`, embeds: [embed] });

        } catch (error) {
            log(error);
            interaction.reply({
                content: 'There was an error! It has been logged. Please DM M23__ and notify them of the issue!',
                ephemeral: true
            });
        }
    },
};