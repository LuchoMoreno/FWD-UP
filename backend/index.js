// PARA EJECUTAR: 
// - node index.js

require('./db/mongo');

const {PORT} = require('./utils/config');

const express = require('express');

const app = express();

app.use(express.json());

const http = require('http').createServer(app);


//( CONTROLLERS )
const UsrController = require('./controllers/user');



// Endpont main.

app.get("/", (req, res) => {
  //res.send("Hola estoy funcionando.");
  res.status(200).json("Hola estoy funcionando.");
});



// Creo un nuevo usuario
app.post("/users",async (req,res) =>{
    
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let isActive = req.body.isActive;
  let password = req.body.password;

  console.log(name);
  console.log(lastname);

  console.log(password);
  try{
    const result = await UsrController.addUser(name,lastname,email,isActive,password);
    if(result){
      res.status(201).send("Usuario creado correctamente"); // 201
    }else{
      res.status(409).send("El usuario ya existe"); // 409
    }  
  }catch(error){
    console.log(error);
    res.status(500).send("Error al crear el usuario."); //500
  }  
  
});


app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
