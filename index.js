const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x8z5o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);
async function run() {
    try { 
        await client.connect();
        // all collections
        const eventCollection = client.db('sailing-now').collection('events');

        

        // Api hare 
        app.get('/event', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query);
            const events = await cursor.toArray();
            res.send(events);
          });
 
        app.post('/event', async (req, res) => {
            const event = req.body;
            const result = await eventCollection.insertOne(event);
            res.send(result)
})




    }
    finally{}
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to sailing Championship')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})