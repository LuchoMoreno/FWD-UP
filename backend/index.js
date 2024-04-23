// PARA EJECUTAR: 
// node index.js

require('./db/mongo');

const {PORT} = require('./utils/config');

const express = require('express');

const app = express();

app.use(express.json());


// IMPORTO LAS RUTAS.
const usersRouter = require('./routes/usersRouter');


// UTILIZO LAS RUTAS.
app.use('/api/users', usersRouter);



// Endpont main.
app.get("/", (req, res) => {
  //res.send("Hola estoy funcionando.");
  res.status(200).json("Hola estoy funcionando.");
});



app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
