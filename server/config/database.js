require('dotenv').config();

module.exports = {
    database: `mongodb+srv://MagicAdmin:${process.env.DB_PASS}@magicdb-e0xzx.mongodb.net/test?retryWrites=true&w=majority`,
    secret: "baconpancakes"
}