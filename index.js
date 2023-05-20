const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kct9xpl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataCollection = client.db('disneyPrincess').collection('dataCollections');
        const AddCollection = client.db('disneyPrincess').collection('AddDolls');


        // app.get('/dataCollections', async (req, res) => {
        //     const cursor = dataCollection.find();

        //     const result = await cursor.toArray();
        //     res.send(result);
        // })

        // app.post("/AddDolls", async (req, res) => {
        //     const body = req.body;
        //     const result = await AddCollection.insertOne(body);
        //     console.log(body)
        //     res.send(result);
            
        //   });

        //   app.get("/AddDolls", async (req, res) => {
        //     const ToyDisney = await AddCollection.find({}).limit(20).toArray();
             
              
        //     res.send(ToyDisney);
        //   });

        //   app.get("/AddDolls/:email", async (req, res) => {
        //     console.log(req.params.email);
        //     const toys = await AddCollection
        //       .find({
        //         sellerEmail: req.params.email,}).toArray();
        //     res.send(toys);
            
        //   });
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('disney is running ')
})

app.listen(port, () => {
    console.log(`disney princess is running on port ${port}`)
})
