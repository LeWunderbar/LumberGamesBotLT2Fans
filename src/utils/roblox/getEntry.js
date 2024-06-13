const axios = require("axios")
const log = require("../log")
require("dotenv").config()

module.exports = async (datastoreName, key, cursor) => {
    try {
        const response = await axios.get("https://apis.roblox.com/datastores/v1/universes/347743954/standard-datastores/datastore/entries/entry", {
            params: {
                "datastoreName": datastoreName,
                "entryKey": key,
                "cursor": cursor
            },
            headers: {
                "x-api-key": process.env.ROBLOXAPI
            }
        })
        const data = response.data
        return data
    }
    catch(err){
        log(`There was an error! \n \n ${err}`)
        return
    }
};