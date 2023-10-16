const sequelize = require('../util/database');
const { User, Student, Teacher } = require('../models/models');


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



