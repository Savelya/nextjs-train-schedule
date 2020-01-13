const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    const resGetUser = await db.query(escape`
    call get_user(${req.query.name}, ${req.query.password});
    `);
    const user = resGetUser[0];
    // console.log(user);
    res.status(200).json({ user });
};
