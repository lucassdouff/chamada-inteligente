const { addTeacher, addStudent, login } = require('../user');
const { User, Student, Teacher } = require('../../models/models');
const bcrypt = require('bcrypt');

jest.mock('../../models/models', () => ({
    User: {
        create: jest.fn(()=> Promise.resolve({id_user: 1})),
        findOne: jest.fn(()=>Promise.resolve(undefined)),
    },
    Student: {
        create: jest.fn(),
    },
    Teacher: {
        create: jest.fn(),
        findOne: jest.fn(()=>Promise.resolve(undefined)),
    },
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(()=>Promise.resolve('hashedPassword')),
}));

describe('User Controller', () => {
    describe('addTeacher', () => {
        it('creates a new teacher', async () => {
            const req = { body: { email: 'teste@gmail.com', name: 'Teste', password: '123456', cpf: '123456789', id_department: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addTeacher(req, res);

            expect(User.create).toHaveBeenCalledWith({ email: 'teste@gmail.com', name: 'Teste', password: 'hashedPassword', cpf: '123456789' });
            expect(Teacher.create).toHaveBeenCalledWith({ id_teacher: 1, id_department: "1", confirmed: false });
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("doesn't create a new teacher if email is already in use", async () => {
            const req = { body: { email: 'teste@gmail.com', name: 'Existing', password: '123456', cpf: '123456789', id_department: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValueOnce({ email: 'teste@gmail.com' });

            await addTeacher(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ error: 'Email already in use' });
        });
    });

    describe('addStudent', () => {
        it('creates a new student', async () => {
            const req = { body: { email: 'student@gmail.com', name: 'Student', password: '123456', cpf: '987654321', enrollment: "12345678910", id_course: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addStudent(req, res);

            expect(User.create).toHaveBeenCalledWith({ email: 'student@gmail.com', name: 'Student', password: 'hashedPassword', cpf: '987654321' });
            expect(Student.create).toHaveBeenCalledWith({ id_student: 1, enrollment: "12345678910", id_course: "1" });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('login', () => {
        it('logs in a student', async () => {
            const req = { query: { email: 'teste@gmail.com', password: '123456' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValueOnce({ email: 'teste@gmail.com', password: 'hashedPassword', id_user: 1 });
            bcrypt.compare.mockResolvedValueOnce(true);

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'teste@gmail.com' } });
            expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedPassword');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ role: 'student', id: 1, name: undefined });
        });
        it('logs in a teacher', async () => {
            const req = { query: { email: 'teste@gmail.com', password: '123456' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValueOnce({ email: 'teste@gmail.com', password: 'hashedPassword', id_user: 1 });
            bcrypt.compare.mockResolvedValueOnce(true);
            Teacher.findOne.mockResolvedValueOnce({ id_teacher: 1 });

            await login(req, res);

            expect(res.json).toHaveBeenCalledWith({ role: 'teacher', id: 1, name: undefined });
        });
        it("doesn't log in a user with wrong password", async () => {
            const req = { query: { email: 'teste@gmail.com', password: '123456' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValueOnce({ email: 'teste@gmail.com', password: 'hashedPassword', id_user: 1 });
            bcrypt.compare.mockResolvedValueOnce(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});
