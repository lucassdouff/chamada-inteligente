const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoutes = require('../user.routes');


app.use('/user', userRoutes);

const mocks = {
    addTeacher: jest.fn(),
    addStudent: jest.fn(),
    login: jest.fn(),
}

jest.mock('../../controller/user', () => ({
    addTeacher: (req, res, next) => {
        mocks.addTeacher(req.body);
        res.status(200).json({ success: true, message: 'Teacher added successfully' });
    },
    addStudent: (req, res, next) => {
        mocks.addStudent(req.body);
        res.status(200).json({ success: true, message: 'Student added successfully' });
    },
    login: (req, res, next) => {
        mocks.login(req.query);
        res.status(200).json({ success: true, message: 'Login successful' });
    },
}));

describe('User Routes', () => {
    it('should add a teacher', async () => {

        const mockPayload = {
            password: "1234",
            email:"teste@gmail.com",
            name:"teste",
            cpf:"12345678910",
            id_department: 1
        };

        await request(app)
            .post('/user/addTeacher')
            .send(mockPayload)
            .set("Content-type", "application/json");

        
        expect(mocks.addTeacher).toHaveBeenNthCalledWith(1, mockPayload); 
    });

    it('should add a student', async () => {
        const mockPayload = {
            password: "1234",
            email:"teste@gmail.com",
            name:"teste",
            cpf:"12345678910",
            enrollment:"12345678910",
            id_course:1
        };

        await request(app)
            .post('/user/addStudent')
            .send(mockPayload)
            .set("Content-type", "application/json");

        expect(mocks.addStudent).toHaveBeenNthCalledWith(1, mockPayload); 
    });

    it('should login successfully', async () => {
        const mockQuery = {
            email: "test@gmail.com",
            password: "1234"
        };

        await request(app)
            .get('/user/login')
            .query(mockQuery)
            .set("Content-type", "application/json");

        expect(mocks.login).toHaveBeenNthCalledWith(1, mockQuery); 
    });
});
