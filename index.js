const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config()


//Middleware
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.unku5v2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('genisuCar').collection('services');

        //GET services from database
        app.get('/service', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        //GET services from database one user
        app.get('/service/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await serviceCollection.findOne(query);
            res.send(result);
        });

        //POST Method 
        app.post('/service', async(req, res)=> {
            const user = req.body;
            const result = await serviceCollection.insertOne(user);
            res.send(result);
        });


        //DELETe Method
        app.delete('/service/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        });

    }

    finally{

    }
};  
run().catch(console.dir);



app.listen(port, ()=> {
    console.log('Listening is ', port);
})


