const { Department } = require('../../models/models');
const { getAllDepartment, createDepartment, deleteDepartment, getDepartmentById, getDepartmentByName, updateDepartment } = require('../department');

jest.mock('../../models/models', () => ({
    Department: {
        findAll: jest.fn(() => Promise.resolve([{ id_department: 1, name: "D1" }, { id_department: 2, name: "D2" }])),
        create: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(() => Promise.resolve({ save: jest.fn(),id_department: 1, name: 'D1' })),
    },
}));

describe('Department Controller', () => {
    describe('getAllDepartment', () => {
        it('should return all departments', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllDepartment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id_department: 1, name: "D1" }, { id_department: 2, name: "D2" }]);
        });
    });

    describe('createDepartment', () => {
        it('should create a new department', async () => {
            const req = { body: { name: 'D1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createDepartment(req, res);

            expect(Department.create).toHaveBeenCalledWith({ name: 'D1' });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('updateDepartment', () => {
        it('should update a department', async () => {
            const req = { params: { id: 1 }, body: { name: 'D1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateDepartment(req, res);

            expect(Department.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_department: 1, name: 'D1', save: expect.any(Function) });
        });
        it('should return 404 if department is not found', async () => {
            const req = { params: { id: 1 }, body: { name: 'D1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findByPk.mockResolvedValueOnce(undefined);

            await updateDepartment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Department not found.' });
        });
    });

    describe('deleteDepartment', () => {
        it('should delete a department', async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findByPk.mockResolvedValueOnce({ id_department: 1, name: 'D1', destroy: jest.fn() });

            await deleteDepartment(req, res);

            expect(Department.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it('should return 404 if department is not found', async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findByPk.mockResolvedValueOnce(undefined);

            await deleteDepartment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('getDepartmentByName', () => {
        it('should return a department', async () => {
            const req = { query: { name: 'D1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findOne.mockResolvedValueOnce({ id_department: 1, name: 'D1' });

            await getDepartmentByName(req, res);

            expect(Department.findOne).toHaveBeenCalledWith({ where: { name: 'D1' } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_department: 1, name: 'D1' });
        });
        it('should return 404 if department is not found', async () => {
            const req = { query: { name: 'D1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findOne.mockResolvedValueOnce(undefined);

            await getDepartmentByName(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Name not found.' });
        });
    });

    describe('getDepartmentById', () => {
        it('should return a department', async () => {
            const req = { query: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findOne.mockResolvedValueOnce({ id_department: 1, name: 'D1' });

            await getDepartmentById(req, res);

            expect(Department.findOne).toHaveBeenCalledWith({ where: { id_department: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id_department: 1, name: 'D1' });
        });
        it('should return 404 if department is not found', async () => {
            const req = { query: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Department.findOne.mockResolvedValueOnce(undefined);

            await getDepartmentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Id not found.' });
        });
    });
});
