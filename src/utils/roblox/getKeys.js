const axios = require("axios")
const log = require("../log")
require("dotenv").config()

module.exports = (DatastoreName, cursor) => {
    return axios.get("https://apis.roblox.com/datastores/v1/universes/347743954/standard-datastores/datastore/entries", {
        params: {
            "datastoreName": DatastoreName,
            "cursor": cursor
        },
        headers: {
            "x-api-key": process.env.ROBLOXAPI
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        log(`There was an error! \n \n ${err}`)
        return null
    })
}