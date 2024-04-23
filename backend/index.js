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

// Modifico un usuario
app.put("/users/:id",async (req,res) =>{

  const user = { _id: req.params.id, ...req.body };
  //             {_id: req.params.id, name: req.body.name, lastname, email }

  console.log(user);
  try{
    
    const result = await UsrController.editUser(user);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El usuario no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error");
  } 

});


// Elimino un usuario
app.delete("/users/:id", async(req,res) =>{

  try{

    const result = await UsrController.deleteUser(req.params.id);
    if(result){
      res.status(200).send("Usuario borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el usuario.")
    }  

  }catch(error){
    res.status(500).send("Error")
  }
});


// Get de todos los usuarios
app.get("/users", async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});




app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
