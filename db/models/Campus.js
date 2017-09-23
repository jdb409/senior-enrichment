const db = require('../index');
const Sequelize = db.Sequelize;

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    image: {
        type: Sequelize.STRING
    }
})

module.exports = Campus;