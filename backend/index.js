// PARA EJECUTAR: 
// - node index.js


//PORT = 8080;

const express = require('express');

const app = express();

app.use(express.json());

const http = require('http').createServer(app);

// npm install dotenv
require('dotenv').config();

const PORT = process.env.PORT || 8050;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://luchomoreno:IjUfrjuw0dbHwQ3b@cluster0.vic1knz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);









/*
app.get("/", (req, res) => {

    // res.send("Hola mundo.");

    // Generamos la variable resultado. 
    let resultado = { 'BigMac' : 3500,  'Bacon' : 4500,  'Junior' : 2500};

    let resultado2 = {'Garfield' : {'precio' : 14000, 'talle' : 'S', 'categoria' : 'Niños'}, 
    'Snoopy' : {'precio' : 10000, 'talle' : 'M', 'categoria' : 'Mix'},
    'Bird' : {'precio' : 14000, 'talle' : 'L', 'categoria' : 'Adol'}}
    res.json({'Hamgurgesas' : resultado2});

}) 
app.get("/categorias", (req, res) => {

    // Generamos la variable resultado. 
    let categorias = { '1' : 'PERSONAJES',  '2' : 'COMICS',  '3' : 'PELICULAS'};


    res.json({'Categorias' : categorias});

}) 

app.get("/remeras", (req,res) =>{
    let remeras =       {'Garfield' : {'precio' : 14000, 'talle' : 'S', 'categoria' : 'Niños'}, 
                        'Snoopy' : {'precio' : 10000, 'talle' : 'M', 'categoria' : 'Mix'},
                        'Bird' : {'precio' : 14000, 'talle' : 'L', 'categoria' : 'Adol'}}
    
    res.json({'Remeras' : remeras});
})



// EJEMPLO PARA TRAER UN ID
// http://localhost:8080/remeras/25
app.get("/remeras/:id", (req, res) => {
    let id = req.params.id;

    console.log(id);

    res.json({'request' : id});

})



app.post("/remeras", (req,res) =>{
    console.log("CREANDO REMERAS");

    let datos =req.body;
    console.log(datos);

    res.json("Hola mundo - Llamada post")
})



app.post("/", (req,res) =>{
    res.send("Hola mundo - Llamada post")
})


app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});



*/