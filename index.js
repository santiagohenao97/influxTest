const express = require('express');
const app = express();
const cors = require("cors");
const { appConfig, dbConfig } = require('./config')

const temperature = require('./routes/temperature');
const humidity = require('./routes/humidity');
const crop = require('./routes/crop');

//Settings
app.set('port', appConfig.port || 3000);

//Middlewares
app.use(express.json());
app.use(cors());

//Routes

app.use('/api/crop', crop);
app.use('/api/temperature', temperature);
app.use('/api/humidity', humidity);

app.get('/', (req, res)=>{
  res.send('Para consultar usar /api/"nombreVariable"')
})

//Ajustes del servidor
app.listen(app.get('port'),()=>{
  console.clear()
  console.log(`servidor corriendo en el puerto ${app.get('port')}`);
})