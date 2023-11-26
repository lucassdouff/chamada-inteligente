const database = require('../util/database');
const { Department , Course } = require('../models/models');

exports.getAllCourse = async(req, res) => {
    try{
        const courses = await Course.findAll();
        res.status(200).json(courses);
    }catch(error){
        console.error("An error occurred while get all the course: ", error);
        res.status(500).json({error: 'An error occurred while get all the course'});
    } 
}

exports.createCourse = async(req, res) => {
    try {
        const { name, id_department } = req.body;

        const newCourse = await Course.create({name, id_department });
        res.status(200).json(newCourse);
    } catch(error){
        console.error("An error occurred while creating the course: ", error);
        res.status(500).json({error: 'An error occurred while creating the course'});
    }
}

exports.updateCourse = async(req, res) => {
    try{
        const courseId = req.params.id;
        const { name } = req.body;
        const courseToUpdate = await Course.findByPk(courseId);

        if (!courseToUpdate){
            return res.status(404).json({ error: 'Course not found.'});
        }

        courseToUpdate.name = name || courseToUpdate.name;

        await courseToUpdate.save();

        res.status(200).json(courseToUpdate);
    }catch(error){
        console.error("An error occurred while updating the course", error);
        res.status(500).json({error: 'An error occurred while updating the course'})
    }
}

exports.deleteCourse = async(req, res) => {
    try{
        const courseId = req.params.id;
        const courseToDelete = await Course.findByPk(courseId);

        if (!courseToDelete){
            return res.status(404).json({ error: 'Course not found.'});
        }

        await courseToDelete.destroy();
        res.status(200).json({ message: 'Course deleted successfully.'});
    }catch (error){
        console.error('An error occurred while deleting the course:', error);
        res.status(500).json({ error: 'An error occurred while deleting the course'});
    }
}

exports.getCourseByName = async(req, res) => {
    try{
        const courseName = req.query.name;
        
        if(!courseName){
            return res.status(400).json({ error : 'Name parameter is required.'});
        }

        const course = await Course.findOne({
            where: {
                name: courseName
            }
        });

        if (!course){
            return res.status(404).json({ error: 'Name not found.'});
        }

        res.status(200).json(course)
    }catch(error){
        console.error("An error occurred while fetching the course: ", error);
        res.status(500).json({error: 'An error occurred while fetching the course'});
    } 
}

exports.getCourseByNameDepartment = async(req, res) => {
    try{
        const departmentName = req.query.name;
        
        if(!departmentName){
            return res.status(400).json({ error : 'Name parameter is required.'});
        }

        const department = await Department.findOne({
            where: {
                name: departmentName
            }
        })

        if (!department){
            return res.status(404).json({ error: 'Department Name Not Found'})
        }

        const course = await Course.findAll({
            where: {
                id_department: department["id_department"]
            }
        });

        if (!course){
            return res.status(404).json({ error: 'Course not found.'});
        }

        res.status(200).json(course)
    }catch(error){
        console.error("An error occurred while fetching the course: ", error);
        res.status(500).json({error: 'An error occurred while fetching the course'});
    } 
}

exports.getCourseById = async(req, res) => {
    try{
        const courseId = req.query.id;

        if(!courseId){
            return res.status(400).json({ error : 'Id parameter is required.'});
        }

        const course = await Course.findByPk(courseId);

        if (!course){
            return res.status(404).json({ error: 'Id not found.'});
        }

        res.status(200).json(course)
    }catch(error){
        console.error("An error occurred while fetching the course: ", error);
        res.status(500).json({error: 'An error occurred while fetching the course'});
    } 
}