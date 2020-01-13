const db = require("../../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
    const resNewFavorite = await db.query(escape`
    call new_favorite(${req.query.id}, ${req.query.from}, ${req.query.to});
    `);
    const newFavorite = resNewFavorite[0][0];
    console.log(newFavorite);
    res.status(200).json({ newFavorite });
};
