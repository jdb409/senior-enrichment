const router = require('express').Router();
const Student = require('../../db/models/Student')

router.get('/', (req, res, next) => {
    Student.findAll({
        include: [{ all: true }]
    })
        .then(students => {
            res.send(students);
        })
});

router.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
        .then(student => {
            res.send(student)
        })
})

module.exports = router;