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
    }
})

Student.changeCampus = (studentId, campusId) => {
    console.log('hello');
    return Student.findById(studentId)
        .then(student => {
            student.campusId = campusId;
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