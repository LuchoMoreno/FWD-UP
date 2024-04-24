const dollsRouter = require('express').Router();

//( CONTROLLERS )
const DollController = require('../controllers/dollController');
const Middleware = require('../middleware/auth-middleware');


// Creo un nuevo usuario
dollsRouter.post("/dolls",async (req,res) =>{
    
    let userId = req.body.userId;
    let type = req.body.type;
    let color = req.body.color;
    let accessories = req.body.accessories;

    try{
      const result = await DollController.addDoll(userId,type,color,accessories);
      
      if(result){
        res.status(201).send("Peluche creado correctamente"); // 201
      }
      
      else{
        res.status(409).send("El peluche ya existe"); // 409
      }  

    }catch(error){
      console.log(error);
      res.status(500).send("Error al crear peluche."); //500
    }  
    
  });
  

  // Elimino un doll
  dollsRouter.delete("/dolls/:id", async(req,res) =>{
  
    try{
  
      const result = await DollController.deleteDoll(req.params.id);
      if(result){
        res.status(200).send("Muñeco borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el muñeco.")
      }  
  
    }catch(error){
      res.status(500).send("Error")
    }
  });
  
  

  // Get de todos los muñecos (ESTE METODO ES PRIVADO) 
  // En postman hay que ir a "Authorization", seleccionar Bearer Token y pegarlo al mismo pero SIN comillas.
  dollsRouter.get("/dolls", Middleware.verify, async (req,res) =>{

    let limit = req.query.limit;
    let offset = req.query.offset;

    try{
        const results = await DollController.getAllDolls(limit,offset);
        res.status(200).json(results);

    }catch(error){
        res.status(500).send("Error. Intente más tarde.")
    }

});
  

  module.exports = dollsRouter;