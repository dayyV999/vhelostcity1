import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("vhelostcity");
  const collection = db.collection("products");

  const products = await collection.find({}).toArray();

  res.status(200).json(products);
}
