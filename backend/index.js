// PARA EJECUTAR: 
// node index.js

require('./db/mongo');

const {PORT} = require('./utils/config');

const express = require('express');

const cors = require('cors'); // Importa el paquete cors

const app = express();

app.use(cors()); // Usa el middleware cors

app.use(express.json());




// IMPORTO LAS RUTAS.
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const dollRouter = require('./routes/dollRouter');
const rankingRouter = require('./routes/rankingRouter');



// UTILIZO LAS RUTAS.
app.use('/api/auth', authRouter);
app.use('/api', usersRouter);
app.use('/api', dollRouter);
app.use('/api', rankingRouter);



// Endpont main.
app.get("/", (req, res) => {
  res.status(200).json("Hola estoy funcionando.");
});


app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
