const axios = require("axios")
const log = require("../log")
require("dotenv").config()

module.exports = async (orderedDataStore, scope, orderby, maxpagesize, cursor) => {
    try {
        const response = await axios.get(`https://apis.roblox.com/ordered-data-stores/v1/universes/347743954/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`, {
            params: {
                "max_page_size": maxpagesize,
                "order_by": orderby,
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