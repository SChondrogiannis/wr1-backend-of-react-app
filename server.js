require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
// const bodyParser = require('body-parser');

// Obviously in a real project you use your DB. I just didn't wanted to spam the endpoint every time 
globalThis.storeDBData = null;
globalThis.lastDBVarUpdated = Date.now();
globalThis.postsTempSoThatNoSpammingTheEndpoint = null;
globalThis.photosTempSoThatNoSpammingTheEndpoint = null;

const routes = require('./routes/routes');
require('./controllers/loadControllers');

const app = express();
// I puss to git and the env file, it is not in gitignore. Obviously this never happens in a real project. 
console.log('PORT:', process.env.PORT);
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser.json()); 
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});

