const express = require('express');
const app = express();
const database = require('./util/database');
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



const userRoute = require("./routes/user.routes");
const classRoute = require("./routes/class.routes");
const attendanceRollRoute = require("./routes/attendanceRoll.routes");
const departmentRoute = require("./routes/department.routes");
const courseRoute = require("./routes/course.routes");
const attendanceRoute = require("./routes/attendance.routes");


app.use('/user', userRoute);
app.use('/class', classRoute);
app.use('/attendanceRoll',attendanceRollRoute);
app.use('/department', departmentRoute);
app.use('/course', courseRoute);
app.use('/attendance', attendanceRoute);


app.listen(port, () => console.log(`Express app running on port ${port}!`));
