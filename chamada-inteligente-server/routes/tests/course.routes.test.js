const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const courseRoutes = require('../course.routes');

app.use('/course', courseRoutes);

const mocks = {
    getAllCourses: jest.fn(),
    getCourseByName: jest.fn(),
    getCourseByNameDepartment: jest.fn(),
    getCourseById: jest.fn(),
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
}

jest.mock('../../controller/course', () => ({
    getAllCourse: (req, res, next) => {
        mocks.getAllCourses();
        res.status(200).json({ success: true, message: 'Courses returned successfully' });
    },
    getCourseByName: (req, res, next) => {
        mocks.getCourseByName(req.query);
        res.status(200).json({ success: true, message: 'Course returned successfully' });
    },
    getCourseByNameDepartment: (req, res, next) => {
        mocks.getCourseByNameDepartment(req.query);
        res.status(200).json({ success: true, message: 'Course returned successfully' });
    },
    getCourseById: (req, res, next) => {
        mocks.getCourseById(req.query);
        res.status(200).json({ success: true, message: 'Course returned successfully' });
    },
    createCourse: (req, res, next) => {
        mocks.createCourse(req.body);
        res.status(201).json({ success: true, message: 'Course created successfully' });
    },
    updateCourse: (req, res, next) => {
        mocks.updateCourse(req.params, req.body);
        res.status(200).json({ success: true, message: 'Course updated successfully' });
    },
    deleteCourse: (req, res, next) => {
        mocks.deleteCourse(req.params);
        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    },
}));

describe('Course Routes', () => {
    it('should get all courses', async () => {
        await request(app).get('/course');
        expect(mocks.getAllCourses).toHaveBeenCalledTimes(1);
    });
    it('should get course by name', async () => {
        const name = 'exampleCourse';
        await request(app).get(`/course/ByName?name=${name}`);
        expect(mocks.getCourseByName).toHaveBeenCalledWith({ name });
    });
    it('should get course by name department', async () => {
        const name = 'exampleCourse';
        await request(app).get(`/course/ByNameDepartment?name=${name}`);
        expect(mocks.getCourseByNameDepartment).toHaveBeenCalledWith({ name });
    });
    it('should get course by id', async () => {
        const id = 'exampleId';
        await request(app).get(`/course/ById?id=${id}`);
        expect(mocks.getCourseById).toHaveBeenCalledWith({ id });
    });
    it('should create a course', async () => {
        const mockPayload = {
            name: 'exampleCourse',
            id_department: 1
        };
        await request(app)
            .post('/course')
            .send(mockPayload)
            .set("Content-type", "application/json");
        expect(mocks.createCourse).toHaveBeenCalledWith(mockPayload);
    });
    it('should update a course', async () => {
        const id = 'exampleId';
        const mockPayload = { name: 'updatedCourse' };
        await request(app)
            .put(`/course/${id}`)
            .send(mockPayload)
            .set("Content-type", "application/json");
        expect(mocks.updateCourse).toHaveBeenCalledWith({ id }, mockPayload);
    });
    it('should delete a course', async () => {
        const id = 'exampleId';
        await request(app).delete(`/course/${id}`);
        expect(mocks.deleteCourse).toHaveBeenCalledWith({ id });
    });
});
