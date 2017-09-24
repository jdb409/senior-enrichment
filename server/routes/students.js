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

router.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => {
            res.send(student);
        }).catch(next);
});

router.put('/:studentId', (req, res, next) => {
    Student.findById(req.params.campusId)
        .then(student => {
            res.send(student);
            //update
        })
})

router.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(student => {
            res.sendStatus(200);
        })
})

module.exports = router;