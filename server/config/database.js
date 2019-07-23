require("dotenv").config();

module.exports = {
  database: `mongodb+srv://MagicAdmin:${
    process.env.DB_PASS
  }@magicdb-e0xzx.mongodb.net/test?retryWrites=true&w=majority`,
  testDatabase: `mongodb+srv://admin:${
    process.env.TEST_SUITE
  }@magictesting-kiqdm.mongodb.net/test?retryWrites=true&w=majority`,
  secret: "baconpancakes"
};
