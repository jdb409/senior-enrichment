const db = require('../index');
const Sequelize = db.Sequelize;
const Student = require('./Student');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: 'https://www.nasa.gov/sites/default/files/thumbnails/image/exo-neptune_art_1080.jpg'
    }
    
})



Campus.addStudent = (campusId, studentId) => {
        console.log(__dirname)
        return Promise.all([Campus.findById(campusId, { include: [{ all: true }] }), Student.findById(studentId * 1)])
            .then(([campus, student]) => {
                return campus.addStudent(student)
                    .then(campus => {
                        return Campus.findById(campusId, { include: [{ all: true }] })
                    })
            })
    }

Campus.removeStudent = (campusId, studentId) => {
        return Student.findById(studentId * 1)
            .then(student => {
                student.campusId = null;
                return student.save()
            }).then(() => {
                return Campus.findById(campusId, { include: [{ all: true }] })
            })
    }

module.exports = Campus;