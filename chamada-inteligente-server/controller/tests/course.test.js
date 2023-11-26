const { Course } = require('../../models/models');
const { getCourseById,createCourse,deleteCourse,getAllCourse,getCourseByName,getCourseByNameDepartment,updateCourse } = require('../course');

jest.mock('../../models/models', () => ({
    Course: {
        findAll: jest.fn(() => Promise.resolve([{ id_course: 1, name: "C1" }, { id_course: 2, name: "C2" }])),
        findByPk: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
    },
    Department: {
        findOne: jest.fn(()=>Promise.resolve({id_department: 1})),
    }
}));


describe('Course Controller', () => {

    describe('getAllCourse', () => {
        it('should return all courses', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id_course: 1, name: "C1" }, { id_course: 2, name: "C2" }]);
        });
    });
    describe("createCourse", () => {
        it("should create a new course", async () => {
            const req = { body: { name: "C1", id_department: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createCourse(req, res);

            expect(Course.create).toHaveBeenCalledWith({ name: "C1", id_department: "1" });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("updateCourse", () => {
        it("should update a course", async () => {
            const req = { params: { id: 1 }, body: { name: "C1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce({ save: jest.fn(), id_course: 1, name: "C1" });

            await updateCourse(req, res);

            expect(Course.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_course: 1, name: "C1", save: expect.any(Function) });
        });
        it("should return 404 if course is not found", async () => {
            const req = { params: { id: 1 }, body: { name: "C1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce(undefined);

            await updateCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Course not found." });
        });
    });
    describe("deleteCourse", () => {
        it("should delete a course", async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce({ destroy: jest.fn() });

            await deleteCourse(req, res);

            expect(Course.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Course deleted successfully." });
        });
        it("should return 404 if course is not found", async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce(undefined);

            await deleteCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Course not found." });
        });
    });
    describe("getCourseByName", () => {
        it("should return a course by name", async () => {
            const req = { query: { name: "C1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findOne.mockResolvedValueOnce([{ id_course: 1, name: "C1" }]);

            await getCourseByName(req, res);

            expect(Course.findOne).toHaveBeenCalledWith({ where: { name: "C1" } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id_course: 1, name: "C1" }]);
        });
    });
    describe("getCourseByNameDepartment", ()=>{
        it("should return a course by name of the department", async () => {
            const req = { query: { name: "D1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getCourseByNameDepartment(req, res);

            expect(Course.findAll).toHaveBeenCalledWith({ where: { id_department: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("getCourseById", () => {
        it("should return a course by id", async () => {
            const req = { query: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce({ id_course: 1, name: "C1" });

            await getCourseById(req, res);

            expect(Course.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_course: 1, name: "C1" });
        });
        it("should return 404 if course is not found", async () => {
            const req = { query: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Course.findByPk.mockResolvedValueOnce(undefined);

            await getCourseById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Id not found." });
        });
    });
});
