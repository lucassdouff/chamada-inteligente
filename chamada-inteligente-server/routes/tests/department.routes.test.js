const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const departmentRoutes = require('../department.routes');

app.use('/department', departmentRoutes);

const mocks = {
    getDepartments: jest.fn(),
    getDepartmentByName: jest.fn(),
    getDepartmentById: jest.fn(),
    createDepartment: jest.fn(),
    updateDepartment: jest.fn(),
    deleteDepartment: jest.fn(),
}

jest.mock('../../controller/department', () => ({
    getAllDepartment: (req, res, next) => {
        mocks.getDepartments();
        res.status(200).json({ success: true, message: 'Departments returned successfully' });
    },
    getDepartmentByName: (req, res, next) => {
        mocks.getDepartmentByName(req.query);
        res.status(200).json({ success: true, message: 'Department returned successfully' });
    },
    getDepartmentById: (req, res, next) => {
        mocks.getDepartmentById(req.query);
        res.status(200).json({ success: true, message: 'Department returned successfully' });
    },
    createDepartment: (req, res, next) => {
        mocks.createDepartment(req.body);
        res.status(200).json({ success: true, message: 'Department created successfully' });
    },
    updateDepartment: (req, res, next) => {
        mocks.updateDepartment(req.params, req.body);
        res.status(200).json({ success: true, message: 'Department updated successfully' });
    },
    deleteDepartment: (req, res, next) => {
        mocks.deleteDepartment(req.params);
        res.status(200).json({ success: true, message: 'Department deleted successfully' });
    },
    
}));

describe('Department Routes', () => {
    it('should get all departments', async () => {
        await request(app).get('/department');
        expect(mocks.getDepartments).toHaveBeenCalledTimes(1);
    });

    it('should get department by name', async () => {
        const name = 'exampleDepartment';
        await request(app).get(`/department/ByName?name=${name}`);
        expect(mocks.getDepartmentByName).toHaveBeenCalledWith({ name });
    });

    it('should get department by id', async () => {
        const id = 'exampleId';
        await request(app).get(`/department/ById?id=${id}`);
        expect(mocks.getDepartmentById).toHaveBeenCalledWith({ id });
    });

    it('should create a department', async () => {
        const payload = { name: 'exampleDepartment' };
        await request(app).post('/department').send(payload);
        expect(mocks.createDepartment).toHaveBeenCalledWith(payload);
    });

    it('should update a department', async () => {
        const id = 'exampleId';
        const payload = { name: 'updatedDepartment' };
        await request(app).put(`/department/${id}`).send(payload);
        expect(mocks.updateDepartment).toHaveBeenCalledWith({ id }, payload);
    });

    it('should delete a department', async () => {
        const id = 'exampleId';
        await request(app).delete(`/department/${id}`);
        expect(mocks.deleteDepartment).toHaveBeenCalledWith({ id });
    });
});
