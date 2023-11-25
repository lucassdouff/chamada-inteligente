const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const classRoutes = require('../class.routes');

app.use('/class', classRoutes);

const mocks = {
    addClass: jest.fn(),
    getAllClasses: jest.fn(),
    getStudentsByClassId: jest.fn(),
    getClassStats: jest.fn(),
    assignStudentToClass: jest.fn(),
    editClass: jest.fn(),
    removeClass: jest.fn(),
};

jest.mock('../../controller/class', () => ({
    addClass: (req, res, next) => {
        mocks.addClass(req.body);
        res.status(200).json({ success: true, message: 'Class added successfully' });
    },
    getClasses: (req, res, next) => {
        mocks.getAllClasses();
        res.status(200).json({ success: true, message: 'Classes returned successfully' });
    },
    getStudentsByClassID: (req, res, next) => {
        mocks.getStudentsByClassId(req.query);
        res.status(200).json({ success: true, message: 'Students returned successfully' });
    },
    getClassStats: (req, res, next) => {
        mocks.getClassStats(req.query);
        res.status(200).json({ success: true, message: 'Stats returned successfully' });
    },
    assignStudent: (req, res, next) => {
        mocks.assignStudentToClass(req.body);
        res.status(200).json({ success: true, message: 'Student assigned successfully' });
    },
    editClass: (req, res, next) => {
        mocks.editClass(req.params, req.body);
        res.status(200).json({ success: true, message: 'Class edited successfully' });
    },
    removeClass: (req, res, next) => {
        mocks.removeClass(req.params);
        res.status(200).json({ success: true, message: 'Class removed successfully' });
    },
}));

describe('Class Routes', () => {
    it('should add a new class', async () => {
        const payload = {
            name: 'exampleClass',
            code: '1234',
            semester: '2020/1',
            id_teacher: 1,
            id_course: 1,
            class_weekdays: [
                {
                    weekday: 1,
                    start_time: '08:00',
                    end_time: '10:00',
                },
                {
                    weekday: 2,
                    start_time: '08:00',
                    end_time: '10:00',
                },
            ],
        };

        await request(app)
            .post('/class')
            .send(payload);

        expect(mocks.addClass).toHaveBeenNthCalledWith(1, payload);
    });
    it('should get all classes', async () => {
        await request(app).get('/class');
        expect(mocks.getAllClasses).toHaveBeenCalledTimes(1);
    });
    it('should get students by class id', async () => {
        const id = 'exampleId';
        await request(app).get(`/class/students?id=${id}`);
        expect(mocks.getStudentsByClassId).toHaveBeenCalledWith({ id });
    });
    it('should get class stats', async () => {
        const id = 'exampleId';
        await request(app).get(`/class/stats?id=${id}`);
        expect(mocks.getClassStats).toHaveBeenCalledWith({ id });
    });
    it('should assign a student to a class', async () => {
        const payload = {
            id_student: 1,
            id_class: 1,
        };
        await request(app)
            .post('/class/assignStudent')
            .send(payload);
        expect(mocks.assignStudentToClass).toHaveBeenCalledWith(payload);
    });
    it('should edit a class', async () => {
        const id = 'exampleId';
        const payload = {
            name: 'updatedClass',
        };
        await request(app)
            .put(`/class/${id}`)
            .send(payload);
        expect(mocks.editClass).toHaveBeenCalledWith({ id }, payload);
    });
    it('should remove a class', async () => {
        const id = 'exampleId';
        await request(app).delete(`/class/${id}`);
        expect(mocks.removeClass).toHaveBeenCalledWith({ id });
    });


});
