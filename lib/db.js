const mysql = require("serverless-mysql");

const db = mysql({
    config: {
        host: "localhost",
        database: "train_schedule",
        user: "root",
        password: "123321"
    }
})

exports.query = async query => {
    try {
        const results = await db.query(query)
        await db.end()
        return results
    } catch(err) {
        return { err }
    }
}