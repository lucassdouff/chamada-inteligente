const sequelize = require('../util/database');
const { User, Student, Teacher } = require('../models/models');
const bcrypt = require('bcrypt'); // falta rodar o "npm install bcrypt"

const saltRounds = 10;

exports.addTeacher = async (req, res, next) => {
    const { password, email, name, cpf, id_department } = req.body;
    try {
        const userId = await addUser({ email, name, password, cpf });

        if (userId === -1) return res.status(409).json({ error: "Email already in use" });

        const teacher = await Teacher.create({ id_teacher: userId, id_department, confirmed: false });

        res.status(200).json(teacher);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the teacher' });
    }
}

exports.addStudent = async (req, res, next) => {
  const { password, email, name, enrollment, id_course, cpf } = req.body;
  try {
      const userId = await addUser({ email, name, password, cpf });

      if (userId === -1) return res.status(402).json({ error: "Email already in use" });

      const student = await Student.create({ enrollment, id_course, id_student: userId });

      res.status(200).json(student);

  } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the student' });
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.query;

  try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(404).json({ error: 'User or password are incorrect' });
      }

      const userId = user.id_user;
      const teacher = await Teacher.findOne({ where: { id_teacher: userId } });

      const role = teacher ? "teacher" : "student";

      res.status(200).json({ role, id: userId, name: user.name });

  } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in' });
  }
}

const addUser = async ({ email, name, password, cpf }) => {
  try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const prevUser = await User.findOne({ where: { email } });

      if (prevUser) return -1;

      const user = await User.create({ email, name, password: hashedPassword, cpf });
      return user.id_user;

  } catch (error) {
      console.error("An error occurred while creating the user: ", error);
      throw error;
  }
};
