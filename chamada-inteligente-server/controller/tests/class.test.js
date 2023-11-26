const { Class, Class_Student, Class_Weekday } = require('../../models/models');
const sequelize = require('../../util/database');
const { addClass, assignStudent, editClass, getClassStats, getClasses, getStudentsByClassID, removeClass } = require("../class");


jest.mock("../../util/database");

jest.mock('../../models/models', () => ({
    Class: {
        create: jest.fn(() => Promise.resolve({ id_class: 1, name: 'C1' })),
        findOne: jest.fn(() => Promise.resolve()),
        findAll: jest.fn(() => Promise.resolve([{ dataValues: { id_class: 1, name: 'C1' } }])),
        findByPk: jest.fn(() => Promise.resolve({ save: jest.fn(), id_class: 1, name: 'C1' })),
        destroy: jest.fn(() => Promise.resolve()),
    },
    Class_Student: {
        findAll: jest.fn(() => Promise.resolve()),
        create: jest.fn(() => Promise.resolve()),
        destroy: jest.fn(() => Promise.resolve()),
    },
    Class_Weekday: {
        create: jest.fn(() => Promise.resolve({ weekday: 1, start_time: '08:00', end_time: '10:00' })),
        destroy: jest.fn(() => Promise.resolve()),
        findAll: jest.fn(() => Promise.resolve([{ weekday: 1, start_time: '08:00', end_time: '10:00' }])),
    },
}));

describe('Class Controller', () => {

    describe('addClass', () => {
        it('should create a new class', async () => {
            const req = {
                body: {
                    name: 'C1', code: '123456', semester: '2020.1', id_teacher: 1, id_course: 1, class_weekdays: [
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
                    ]
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addClass(req, res);

            expect(Class.create).toHaveBeenCalledWith({ name: 'C1', code: '123456', semester: '2020.1', id_teacher: 1, id_course: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("assignStudent", () => {
        it("should assign a student to a class", async () => {
            const req = { body: { id_student: 1, id_class: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await assignStudent(req, res);

            expect(Class_Student.create).toHaveBeenCalledWith({ id_student: 1, id_class: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("editClass", () => {
        it("should edit a class", async () => {
            const req = { params: { id: 1 }, body: { name: "C1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Class.findByPk.mockResolvedValueOnce({ save: jest.fn(), id_class: 1, name: "C1" });

            await editClass(req, res);

            expect(Class.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_class: 1, name: "C1", save: expect.any(Function) });
        });
        it("should return 404 if class is not found", async () => {
            const req = { params: { id: 1 }, body: { name: "C1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Class.findByPk.mockResolvedValueOnce(undefined);

            await editClass(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Turma não encontrada.' });
        });
    });
    describe("getClassStats", () => {
        it("should return the class stats", async () => {
            const req = { query: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            sequelize.query.mockResolvedValueOnce([[{ count: 10 }]]).mockResolvedValueOnce([[{ count: 5 }]]).mockResolvedValueOnce([[{ count: 5 }]]);

            await getClassStats(req, res);

            expect(res.json).toHaveBeenCalledWith({ totalStudents: 10, attendancePercentage: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("getClasses", () => {
        it("should return all teacher classes", async () => {
            const req = { query: { id: 1, role: "teacher" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getClasses(req, res);

            expect(Class.findAll).toHaveBeenCalledWith({ where: { id_teacher: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("should return all student classes", async () => {
            const req = { query: { id: 1, role: "student" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            sequelize.query.mockResolvedValueOnce([[{ id_class: 1, name: "C1" }], undefined]).mockResolvedValueOnce([[{ count: 1 }]]);

            await getClasses(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{
                id_class: 1, class_weekdays: [
                    {
                        "end_time": "10:00",
                        "start_time": "08:00",
                        "weekday": 1,
                    },
                ], name: "C1"
            }]);
        });
    });
    describe("getStudentsByClassID", () => {
        it("should return all students from a class", async () => {
            const req = { query: { id_class: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            sequelize.query.mockResolvedValueOnce([[{ count: 1 }]]).mockResolvedValueOnce([[{ id_student: 1, name: "S1", count: 1 }], undefined]);

            await getStudentsByClassID(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ count: 1, attendancePercentage: 100 }]);
        });
    });
    describe("removeClass", () => {
        it("should remove a class", async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await removeClass(req, res);

            expect(Class_Weekday.destroy).toHaveBeenCalledWith({ where: { id_class: 1 } });
            expect(Class_Student.destroy).toHaveBeenCalledWith({ where: { id_class: 1 } });
            expect(Class.destroy).toHaveBeenCalledWith({ where: { id_class: 1 } });
            expect(res.status).toHaveBeenCalledWith(204);
        });
    });
});
