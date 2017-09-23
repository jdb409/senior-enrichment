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

module.exports = Student; 