const fetch = require('node-fetch');

async function getDataById(id, type){
    try{
        let url = ""
        if (type === "news") {
            url = `https://bana.am/admin/api/news-blogs/${id}`
        } else if (type === "event") {
            url = `https://bana.am/admin/api/event-blogs/${id}`

        }
        const data = await fetch(url)   
        return data.json()

    } catch {
        return undefined
    }

}

module.exports = {getDataById}