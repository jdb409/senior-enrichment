const router = require('express').Router();
const Student = require('../../db/models/Student')

router.get('/', (req, res, next) => {
    Student.findAll({
        include: [{ all: true }]
    })
        .then(students => {
            res.send(students);
        }).catch(next);
});

router.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId, { include: [{ all: true }] })
        .then(student => {
            res.send(student)
        }).catch(next);
})

router.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => {
            res.send(student);
        }).catch(next);
});

router.put('/:studentId', (req, res, next) => {
    //checks if delete flag is false
    console.log(req.body);
    if (req.body.campusId > -1) {
        Student.updateInfo(req.params.studentId * 1, req.body)
            .then(student => {
                res.send(student);
            }).catch(next);
    } else {
        Student.removeCampus(req.params.studentId * 1)
            .then(student => {
                res.send(student);
            }).catch(next);
    }

})

router.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(() => {
            res.sendStatus(200);
        }).catch(next);
})

module.exports = router;