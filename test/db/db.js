const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/test"; // 替换为你的数据库名称
const client = new MongoClient(uri, { useNewUrlParser: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

module.exports = { connect };
