const database = require('../util/database');
const { Department } = require('../models/models');

exports.getAllDepartment = async(req, res) => {
    try{
        const departments = await Department.findAll();
        res.json(departments);
    }catch(error){
        console.error("An error occurred while get all the department: ", error);
        res.status(500).json({error: 'An error occurred while get all the department'});
    } 
}

exports.createDepartment = async(req, res) => {
    try {
        const { name } = req.body;
        const newDepartment = await Department.create({name});
        res.json(newDepartment);
    }catch(error){
        console.error("An error occurred while creating the department: ", error);
        res.status(500).json({error: 'An error occurred while creating the department'});
    }
}

exports.updateDepartment = async(req, res) => {
    try{
        const departmentId = req.params.id;
        const { name } = req.body;
        const departmentToUpdate = await Department.findByPk(departmentId);

        if (!departmentToUpdate){
            return res.status(404).json({ error: 'Department not found.'});
        }

        departmentToUpdate.name = name || departmentToUpdate.name;

        await departmentToUpdate.save();

        res.json(departmentToUpdate);
    }catch(error){
        console.error("An error occurred while updating the department", error);
        res.status(500).json({error: 'An error occurred while updating the department'})
    }
}

exports.deleteDepartment = async(req, res) => {
    try{
        const departmentId = req.params.id;
        const departmentToDelete = await Department.findByPk(departmentId);

        if (!departmentToDelete){
            return res.status(404).jsonn({ error: 'Department not found.'});
        }

        await departmentToDelete.destroy();
        res.status(200).json({ message: 'Department deleted successfully.'});
    }catch (error){
        console.error('An error occurred while deleting the department:', error);
        res.status(500).json({ error: 'An error occurred while deleting the department'});
    }
}

exports.getDepartmentByName = async(req, res) => {
    try{
        const departmentName = req.query.name;
        
        if(!departmentName){
            return res.status(400).json({ error : 'Name parameter is required.'});
        }

        const department = await Department.findOne({
            where: {
                name: departmentName
            }
        });

        if (!department){
            return res.status(404).json({ error: 'Name not found.'});
        }

        res.json(department)
    }catch(error){
        console.error("An error occurred while fetching the department: ", error);
        res.status(500).json({error: 'An error occurred while fetching the department'});
    } 
}

exports.getDepartmentById = async(req, res) => {
    try{
        const departmentId = req.query.id;
        
        if(!departmentId){
            return res.status(400).json({ error : 'Id parameter is required.'});
        }

        const department = await Department.findOne({
            where: {
                id_department: departmentId
            }
        });

        if (!department){
            return res.status(404).json({ error: 'Id not found.'});
        }

        res.json(department)
    }catch(error){
        console.error("An error occurred while fetching the department: ", error);
        res.status(500).json({error: 'An error occurred while fetching the department'});
    } 
}