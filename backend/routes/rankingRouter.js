const rankingRouter = require('express').Router();

//( CONTROLLERS )
const RankingController = require('../controllers/rankingController.js');
const Middleware = require('../middleware/auth-middleware');
  
  // Get de 3 tipos de muñecos en el top.
  rankingRouter.get("/ranking", async (req,res) =>{
   
    try{
        
        const topDolls = await RankingController.getTopDolls();
        res.status(200).json(topDolls);

    }catch(error){
        res.status(500).send("Error. Intente más tarde: " + error)
    }

});
  
module.exports = rankingRouter;