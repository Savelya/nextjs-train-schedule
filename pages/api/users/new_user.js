const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    const resNewUser = await db.query(escape`
    call new_user(${req.query.name}, ${req.query.password});
    `);
    const newUser = resNewUser[0][0];
    console.log(newUser);
    res.status(200).json({ newUser });
};
