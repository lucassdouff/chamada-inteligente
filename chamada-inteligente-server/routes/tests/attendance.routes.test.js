const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const attendanceRoutes = require('../attendance.routes');

app.use('/attendance', attendanceRoutes);

const mocks = {
    addAttendance: jest.fn(),
    getAttendancesByAttendanceRoll: jest.fn(),
    getAttendancesByClass: jest.fn(),
    getStudentAttendanceStats: jest.fn(),
    updateAttendances: jest.fn(),
}

jest.mock('../../controller/attendance', () => ({
    createAttendance: (req, res, next) => {
        mocks.addAttendance(req.body);
        res.status(200).json({ success: true, message: 'Attendance added successfully' });
    },
    getAllAttendances: (req, res, next) => {
        mocks.getAttendancesByAttendanceRoll(req.params);
        res.status(200).json({ success: true, message: 'Attendances returned successfully' });
    },
    listAttendanceForClass: (req, res, next) => {
        mocks.getAttendancesByClass(req.params);
        res.status(200).json({ success: true, message: 'Attendances returned successfully' });
    },
    getStudentAttendanceStats: (req, res, next) => {
        mocks.getStudentAttendanceStats(req.params);
        res.status(200).json({ success: true, message: 'Stats returned successfully' });
    },
    updateAttendances: (req, res, next) => {
        mocks.updateAttendances(req.body);
        res.status(200).json({ success: true, message: 'Attendances updated successfully' });
    },
}));


describe('Attendance Routes', () => {
    it('should create a new attendance', async () => {
        const payload = {medical_certificate: 1, id_attendanceRoll: 1, id_student: 1};

        await request(app)
            .post('/attendance')
            .send(payload);

        expect(mocks.addAttendance).toHaveBeenCalledWith(payload);
    });
    it('should get attendances by attendance roll', async () => {
        const attendanceRollId = "1";
        await request(app).get(`/attendance/attendanceRoll/${attendanceRollId}/attendances`);
        expect(mocks.getAttendancesByAttendanceRoll).toHaveBeenCalledWith({ attendanceRollId });
    });
    it('should get attendances by class', async () => {
        const classId = "1";
        await request(app).get(`/attendance/attendance/class/${classId}`);
        expect(mocks.getAttendancesByClass).toHaveBeenCalledWith({ classId });
    });
    it('should get student attendance stats', async () => {
        const id_student = "1";
        const id_class = "1";
        await request(app).get(`/attendance/stats/${id_class}/${id_student}`);
        expect(mocks.getStudentAttendanceStats).toHaveBeenCalledWith({ id_class,id_student });
    });
    it('should update attendances', async () => {
        const payload = {id_attendanceRoll: 1, id_student: 1, medical_certificate: 1};
        await request(app)
            .put('/attendance')
            .send(payload);
        expect(mocks.updateAttendances).toHaveBeenCalledWith(payload);
    });
});
