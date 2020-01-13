const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    if (page < 1) page = 1;
    const resGetSchedule = await db.query(escape`
        call get_schedule();
    `);
    schedule = resGetSchedule[0];
    const count = await db.query(escape`
        SELECT COUNT(*)
        AS scheduleRows
        FROM schedule
    `);
    const scheduleRows = count[0];
    const pageCount = Math.ceil(scheduleRows / limit);
    res.status(200).json({ schedule, pageCount, page });
};
