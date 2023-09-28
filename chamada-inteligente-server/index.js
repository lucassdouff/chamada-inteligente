const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });



const userRoute = require("./routes/user.routes");

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/user', userRoute);

app.listen(port, () => console.log(`Express app running on port ${port}!`));