import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return res.status(500).json({ error: "Missing MONGODB_URI" });
    }

    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db("vhelostcity");
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();

    await client.close();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
