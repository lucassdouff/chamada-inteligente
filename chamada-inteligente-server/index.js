const express = require('express');
const database = require('./util/db');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


const models = require('./models/models.js');

database.sync().then(() => {
    console.log("Todas Tabelas foram criadas com sucesso !!");
}).catch(error => {
    console.error("Erro ao criar as tabelas : ", error);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const departmentRoute = require('./routes/department.routes');
const courseRoute = require('./routes/course.routes');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/department', departmentRoute);
app.get('/departmentByName', departmentRoute);
app.get('/departmentById', departmentRoute);
app.post('/department', departmentRoute);
app.put('/department/:id', departmentRoute);
app.delete('/department/:id', departmentRoute);

app.get('/course', courseRoute);
app.get('/courseByName', courseRoute);
app.get('/courseByNameDepartment', courseRoute);
app.get('/courseById', courseRoute);
app.post('/course', courseRoute);
app.put('/course/:id', courseRoute);
app.delete('/course/:id', courseRoute);


app.listen(port, () => console.log(`Express app running on port ${port}!`));