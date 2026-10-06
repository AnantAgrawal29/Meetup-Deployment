// API ROUTES
// /api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://default:Anant2911@cluster0.onvfyiw.mongodb.net/?appName=Cluster0",
    );
    const db = client.db("meetups");
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}
