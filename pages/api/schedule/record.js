const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    const resGetRecord = await db.query(escape`
    call get_record(${req.query.id});
    `);
    const record = resGetRecord[0][0];
    console.log(record);
    res.status(200).json({ record });
};
