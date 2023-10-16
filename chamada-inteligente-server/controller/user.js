const sequelize = require('../util/database');
const { User, Student, Teacher } = require('../models/models');


exports.addTeacher = async (req, res, next) => {
  const {password, email, name, id_department} = req.body;
  try {
    const userId = await addUser({email,name,password});

    if(userId === -1) return res.status(409).json({error: "Email already in use"});

    const id_teacher = userId[0][0].lastId;
    const teacher = await Teacher.create({id_teacher,id_department, confirmed: false});
    
    res.status(200).json(teacher)

  } catch {
    res.status(500).json({error: 'An error occurred while creating the user'});
  }
}

exports.addStudent = async (req, res, next) => {
  const {password, email, name, enrollment, id_course} = req.body;
  try {
    const userId = await addUser({email,name,password});

    if(userId === -1) return res.status(402).json({error: "Email already in use"});

    const id_student = userId[0][0].lastId;
    const student = await Student.create({enrollment,id_course,id_student});

    res.status(200).json(student)

  } catch(error) {
    res.status(500).json({error: 'An error occurred while creating the user'});
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [results, metadata] = await sequelize.query(`Select u.id_user from user u where u.email = '${email}' and u.password = SHA(CONCAT('${password}',u.salt))`);

    console.log(results)
    if (results.lenght === 0) return res.status(404).json({ error: 'User or password are incorrect'});

    const userId = results[0].id_user;

    const teacher = await Teacher.findOne({
      where: {
        id_teacher: userId
    }
    });

    const role = teacher ? "teacher" : "student";

    res.status(200).json({role, id: userId});
  } catch {
    res.status(500).json({error: 'An error occurred while loging in'});
  }
}



const addUser = async ({email, name, password}) => {
  try {
    const salt = Math.floor(Math.random() * 10000);
    const prevUser = await User.findOne({
      where: {
        email
      }
    })

    if(prevUser) return -1;

    await sequelize.query(`insert into user (email,name,password,salt) values ('${email}','${name}',SHA(CONCAT('${password}','${salt}')),'${salt}');`)
    const res = await sequelize.query("SELECT LAST_INSERT_ID() AS lastId");
    return res;

} catch(error) {
    console.error("An error occurred while creating the user: ", error);
}

};



