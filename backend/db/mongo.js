const {connect} = require('mongoose');

const {DB_URI} = require("../utils/config");


const conectarBD = async() =>{

    connect(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true});
};

conectarBD()

.then( result => {console.log("DB MONGODB : Conectada satisfactoriamente.")})

.catch( error => console.log(error))


/////////////////////////////////////////////////////////////

/****

//const mongoose = require("mongoose");

/*
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));*/


/////////////////////////////////////////////////////////////


/*
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
onst client = new MongoClient(DB_URI, {
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);
*/

