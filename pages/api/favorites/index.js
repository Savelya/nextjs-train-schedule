const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    if (page < 1) page = 1;
    const resGetSchedule = await db.query(escape`
        call get_favorites(${req.query.id});
    `);
    schedule = resGetSchedule[0];
    res.status(200).json({ schedule });
};
