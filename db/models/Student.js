const db = require('../index');
const Sequelize = db.Sequelize;

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    bio: {
        type: Sequelize.TEXT
    }
})

Student.updateInfo = (studentId, update) => {
    console.log('hello');
    return Student.findById(studentId)
        .then(student => {
            student.email = update.email || student.email;
            student.campusId = update.campusId || student.campusId;
            student.bio = update.bio || student.bio;
            return student.save()
                .then(() => {
                    return Student.findById(studentId, { include: [{ all: true }] });
                })
        })
}

Student.removeCampus = (studentId) => {
    return Student.findById(studentId)
        .then(student => {
            student.campusId = null;
            return student.save()
                .then(() => {
                    return Student.findById(studentId, { include: [{ all: true }] });
                })
        })
}

module.exports = Student; 