const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const attendanceRollRoutes = require('../attendanceRoll.routes');

app.use('/attendanceRoll', attendanceRollRoutes);

const mocks = {
    addAttendanceRoll: jest.fn(),
    endAttendanceRoll: jest.fn(),
    deleteAttendanceRoll: jest.fn(),
    getAttendeesByAttendanceRoll: jest.fn(),
    getStudentAttendanceRollHistory: jest.fn(),
    getTeacherAttendanceRollHistory: jest.fn(),
    getOngoingAttendanceRolls: jest.fn(),
    getAllScheduledAttendance: jest.fn(),
}

jest.mock('../../controller/attendanceRoll', () => ({
    createAttendanceRoll: (req, res, next) => {
        mocks.addAttendanceRoll(req.body);
        res.status(200).json({ success: true, message: 'Attendance roll added successfully' });
    },
    endAttendanceRoll: (req, res, next) => {
        mocks.endAttendanceRoll();
        res.status(200).json({ success: true, message: 'Attendance roll ended successfully' });
    },
    deleteAttendanceRoll: (req, res, next) => {
        mocks.deleteAttendanceRoll(req.params);
        res.status(200).json({ success: true, message: 'Attendance roll deleted successfully' });
    },
    getAttendeesByAttendanceRoll: (req, res, next) => {
        mocks.getAttendeesByAttendanceRoll(req.query);
        res.status(200).json({ success: true, message: 'Attendees returned successfully' });
    },
    getStudentAttendanceRollHistory: (req, res, next) => {
        mocks.getStudentAttendanceRollHistory(req.query);
        res.status(200).json({ success: true, message: 'Attendance roll history returned successfully' });
    },
    getTeacherAttendanceRollHistory: (req, res, next) => {
        mocks.getTeacherAttendanceRollHistory(req.query);
        res.status(200).json({ success: true, message: 'Attendance roll history returned successfully' });
    },
    getOngoingAttendanceRoll: (req, res, next) => {
        mocks.getOngoingAttendanceRolls(req.params);
        res.status(200).json({ success: true, message: 'Ongoing attendance rolls returned successfully' });
    },
    getAllScheduledAttendance: (req, res, next) => {
        mocks.getAllScheduledAttendance(req.params);
        res.status(200).json({ success: true, message: 'Scheduled attendance returned successfully' });
    },
}));

describe('Attendance Roll Routes', () => {
    it('should create a new attendance roll', async () => {
        const payload = {id_class: 1, start_datetime: "", end_datetime:"", latitude:"-12312", longitude:"-12312"};

        await request(app)
            .post('/attendanceRoll')
            .send(payload);

        expect(mocks.addAttendanceRoll).toHaveBeenNthCalledWith(1, payload);
    });
    it('should end an attendance roll', async () => {
        await request(app)
            .put('/attendanceRoll/end')
            .send({id: 1});

        expect(mocks.endAttendanceRoll).toHaveBeenCalledTimes(1);
    });
    it('should delete an attendance roll', async () => {
        const id = "1";
        await request(app)
            .delete(`/attendanceRoll/${id}`);

        expect(mocks.deleteAttendanceRoll).toHaveBeenNthCalledWith(1, {id});
    });
    it('should get attendees by attendance roll', async () => {
        const id_attendance_roll = "1";
        const id_class = "1";
        await request(app)
            .get(`/attendanceRoll/atendees?id_attendance_roll=${id_attendance_roll}&id_class=${id_class}`);

        expect(mocks.getAttendeesByAttendanceRoll).toHaveBeenNthCalledWith(1, {id_attendance_roll, id_class});
    });
    it('should get student attendance roll history', async () => {
        const id = "1";
        await request(app)
            .get(`/attendanceRoll/history/student?id=${id}`);

        expect(mocks.getStudentAttendanceRollHistory).toHaveBeenNthCalledWith(1, {id});
    });
    it('should get teacher attendance roll history', async () => {
        const id = "1";
        await request(app)
            .get(`/attendanceRoll/history/teacher?id=${id}`);

        expect(mocks.getTeacherAttendanceRollHistory).toHaveBeenNthCalledWith(1, {id});
    });
    it('should get ongoing attendance rolls', async () => {
        const id_class = "1";

        await request(app)
            .get(`/attendanceRoll/ongoing/${id_class}`);

        expect(mocks.getOngoingAttendanceRolls).toHaveBeenNthCalledWith(1, {id_class});
    });
    it('should get all scheduled attendance', async () => {
        const id_class = "1";

        await request(app)
            .get(`/attendanceRoll/upcoming/${id_class}`);

        expect(mocks.getAllScheduledAttendance).toHaveBeenNthCalledWith(1, {id_class});
    });
});
