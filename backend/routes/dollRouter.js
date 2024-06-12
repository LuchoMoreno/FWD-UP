const dollsRouter = require('express').Router();

//( CONTROLLERS )
const DollController = require('../controllers/dollController');
const Middleware = require('../middleware/auth-middleware');


// Creo un nuevo peluche
dollsRouter.post("/dolls", Middleware.verify, async (req,res) =>{
    
    let userId = req.body.userId;
    let type = req.body.type;
    let color = req.body.color;
    let accessories = req.body.accessories;

    try{
      const result = await DollController.addDoll(userId,type,color,accessories);
      
      if(result){
        res.status(201).send("Peluche creado correctamente"); // 201
      }
      else
      {
        res.status(404).send("No existe ningun usuario con ese ID"); // 404
      }
      
    }catch(error){
      console.log(error);
      res.status(500).send("Error al crear peluche."); //500
    }  
    
  });
  

  // Elimino un doll
  dollsRouter.delete("/dolls/:id", Middleware.verify, async(req,res) =>{
  
    try{
  
      const result = await DollController.deleteDoll(req.params.id);
      if(result){
        res.status(200).send("Muñeco borrado.")
      }else{
        res.status(404).send("El muñeco no existe.")
      }  
  
    }catch(error){
      res.status(500).send("Error")
    }
  });
  
  
  // Get de todos los muñecos (ESTE METODO ES PRIVADO) 
  dollsRouter.get("/dolls", async (req, res) => {
    let limit = parseInt(req.query.limit) || 10;
    let offset = parseInt(req.query.offset) || 0;

    try {
      const results = await DollController.getAllDolls(limit, offset);
      const totalDolls = await DollController.contarDocumentos(); // Obtén el conteo total de muñecos
      
      // Enviar un objeto JSON que contiene tanto la data como el total de muñecos
      res.status(200).json({
          result: results,
          totalCount: totalDolls
      });
  } catch (error) {
      res.status(500).send("Error. Intente más tarde.");
  }
});
  

  module.exports = dollsRouter;