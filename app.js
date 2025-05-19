const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "statsdb";

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("uscensus");

    const sortedResults = await collection.find().sort({ state: 1 }).toArray();

    console.log("📄 Records sorted by state (ascending):");
    console.log(sortedResults);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("✅ Connection closed");
  }
}

run();
